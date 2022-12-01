import "../module/index.js";
import os from "os";

// ESSENTIALS
console.send("please come to say nigga and my private token is xxxxx-yyyyy-zzzzz");
console.log("util info about logs");
console.err("SOMETHING FAILED");
console.error("SOMETHING FAILED... AGAIN")
console.debug("DEBUGGING/NO BREAK");

// GROUP TESTING
console.group("GROUP CREATED - SYSTEM INFO");
console.info("RAM/USED", console.memory, "MB");
console.info("RAM/FREE", os.freemem() / 1024, "MB")
console.info("CPU/CORES", os.cpus().at(0));
console.unGroup("SYSTEM INFO ENDED");

// MULTI TYPEOF
console.warn("SOMETHING ON CORE", 53, "IS GETTING OVERHITING");
console.warn("THE VALUE RETURNED IS", false);
console.debug("SYSTEM COMPLETED THE", 180, "FILE LOAD AND ALLS RETURNED", true, "WITH FUNCTION", () => {}, "AND", function Rename(){});
console.error("PROBABLY SYMBOL", Symbol("NAMED_SYS"), "IS INVALID");