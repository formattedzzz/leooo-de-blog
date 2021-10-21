# go `struct` 转 `map`

```go
package structtomap

import (
	"fmt"
	"reflect"
)

type SupMap map[string]interface{}

// struct递归转换为map[string]interface{}
func StructToMap(object interface{}, tagName string) (SupMap, error) {
	resp := SupMap{}
	object_type := reflect.TypeOf(object)
	object_value := reflect.ValueOf(object)
	object_kind := object_type.Kind()
	if object_kind == reflect.Ptr {
		// 如果是指针类型
		object_value = object_value.Elem()
		object_type = reflect.TypeOf(object_value.Interface())
		object_kind = reflect.TypeOf(object_value.Interface()).Kind()
	}
	if object_kind != reflect.Struct {
		// 非结构体报错
		return nil, fmt.Errorf("struct-to-map accepts struct or struct-pointer; but got %v", object_type)
	}

	for i := 0; i < object_type.NumField(); i++ {
		field := object_type.Field(i)
		field_type := field.Type.Kind()
		field_name := field.Tag.Get(tagName)
		field_value := object_value.Field(i).Interface()
		if field_name == "" {
			field_name = field.Name
		}
		fmt.Println(field_type, field_value, field.Name)
		if field_type != reflect.Struct {
			resp[field_name] = field_value
		} else {
			if temp, err := StructToMap(field_value, tagName); err == nil {
				resp[field_name] = temp
			}
		}
	}
	return resp, nil
}
```

测试

```go
package structtomap

import (
	"reflect"
	"testing"
)

// struct递归转换为map[string]interface{}
func TestStructToMap(t *testing.T) {
	type demo struct {
		input interface{}
		want  SupMap
	}

	type T1 struct {
		Name  string `json:"name"`
		Age   int
		Marry bool
	}
	type T2_1 struct {
		Info string `json:"info"`
	}
	type T2 struct {
		Array []interface{} `json:"array"`
		Other T2_1
	}

	demo1 := demo{
		input: T1{
			Name: "leooo",
		},
		want: SupMap{
			"name":  "leooo",
			"Age":   0,
			"Marry": false,
		},
	}
	demo2 := demo{
		input: T2{
			Array: []interface{}{1, "", true, 1.2},
			Other: T2_1{
				Info: "shiyu",
			},
		},
		want: SupMap{
			"array": []interface{}{1, "", true, 1.2},
			"Other": SupMap{
				"info": "shiyu",
			},
		},
	}
	demo3 := demo{
		input: &T1{
			Name: "leooo",
		},
		want: SupMap{
			"name":  "leooo",
			"Age":   0,
			"Marry": false,
		},
	}
	demo4 := demo{
		input: []interface{}{1, true, ""},
		want:  nil,
	}
	demos := []demo{demo1, demo2, demo3, demo4}
	for _, demo := range demos {
		got, _ := StructToMap(demo.input, "json")
		if !reflect.DeepEqual(got, demo.want) {
			t.Errorf("excepted:%#v, got:%#v", demo.want, got)
		}
	}
}
```
