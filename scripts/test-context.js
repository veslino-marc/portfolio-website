// Quick test of context awareness logic
const testMessage = "tell me more about blinders vault";
const lowerMessage = testMessage.toLowerCase();

console.log("Testing:", testMessage);
console.log("Lower:", lowerMessage);
console.log("");

console.log("Checks:");
console.log("  includes('blinders'):", lowerMessage.includes('blinders'));
console.log("  includes('vault'):", lowerMessage.includes('vault'));
console.log("  includes('mindstack'):", lowerMessage.includes('mindstack'));
console.log("  includes('second'):", lowerMessage.includes('second'));
console.log("");

if (lowerMessage.includes('blinders') || lowerMessage.includes('vault')) {
    console.log("✅ MATCH: Should return Blinders Vault response");
} else {
    console.log("❌ NO MATCH: Logic error");
}
