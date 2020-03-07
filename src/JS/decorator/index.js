function fast(target, name, descriptor) {
	target.speed = 20;

	let run = descriptor.value;
	descriptor.value = function() {
		run();
		console.log(`speed ${this.speed}`);
	};
	return descriptor;
}

class Rabbit {
	@fast
	run() {
		console.log("running~");
	}
}

var bunny = new Rabbit();

bunny.run();
// running~
// speed 20

console.log(bunny.speed); // 20


