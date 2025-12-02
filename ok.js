console.log("start");

async function task() {
  console.log("first");          // A
  await Promise.resolve("finish");
  console.log("second");         // B
}

task().then(data => console.log(data));  // C

console.log("end");
