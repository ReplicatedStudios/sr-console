import "../module/index.js";
import os from "os";



// CONSOLE GROUPING
console.group("GROUP CREATED - SYSTEM INFO");
// ESSENTIALS
console.send("please come to say nigga and my private token is xxxxx-yyyyy-zzzzz");
console.error("SOMETHING FAILED... AGAIN")
console.log("util info about logs");
console.err("SOMETHING FAILED");
console.debug("DEBUGGING/NO BREAK");

// GROUP TESTING
console.info("RAM/USED", console.memory, "MB");
console.info("RAM/FREE", os.freemem() / 1024, "MB")
console.info("CPU/CORES", os.cpus().at(0));

// MULTI TYPEOF
console.warn("SOMETHING ON CORE", 53, "IS GETTING OVERHITING");
console.warn("THE VALUE RETURNED IS", false);
console.debug("SYSTEM COMPLETED THE", 180, "FILE LOAD AND ALLS RETURNED", true, "WITH FUNCTION", () => {}, "AND", function Rename(){});
console.error("PROBABLY SYMBOL", Symbol("NAMED_SYS"), "IS INVALID");

console.unGroup("SYSTEM INFO ENDED");

// LOG GROUPING
LOG.group("GROUP CREATED - SYSTEM INFO");
// ESSENTIALS
LOG.send("please come to say nigga and my private token is xxxxx-yyyyy-zzzzz");
LOG.log("util info about logs");
LOG.err("SOMETHING FAILED");
LOG.error("SOMETHING FAILED... AGAIN")
LOG.debug("DEBUGGING/NO BREAK");

// GROUP TESTING
LOG.info("RAM/USED", console.memory, "MB");
LOG.info("RAM/FREE", os.freemem() / 1024, "MB")
LOG.info("CPU/CORES", os.cpus().at(0));

// MULTI TYPEOF
LOG.warn("SOMETHING ON CORE", 53, "IS GETTING OVERHITING");
LOG.warn("THE VALUE RETURNED IS", false);
LOG.debug("SYSTEM COMPLETED THE", 180, "FILE LOAD AND ALLS RETURNED", true, "WITH FUNCTION", () => {}, "AND", function Rename(){});
LOG.error("PROBABLY SYMBOL", Symbol("NAMED_SYS"), "IS INVALID");

LOG.unGroup("SYSTEM INFO ENDED");