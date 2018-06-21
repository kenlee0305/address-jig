translations = [
  ["street", "st.", "st"],
  ["drive", "dr.", "dr"],
  ["lane", "ln.", "ln"],
  ["avenue", "ave.", "ave"],
  ["west", "w.", "w"],
  ["east", "e.", "e"],
  ["north", "n.", "n"],
  ["south", "s.", "s"],
  ["east", "e.", "e"],
  ["boulevard", "blvd", "blvd."]
];

units = ["Unit A", "Unit B", "Unit C"];

function jigAddress(addressString) {
  jigs = [{ address: addressString, others: [] }];
  parts = addressString.split(" ");
  for (var index = 0; index < parts.length; index++) {
    part = parts[index];
    translations.forEach(entry => {
      possibleJigs = [];
      entry.forEach(val => {
        if (part.toLowerCase() === val) {
          entry.forEach(value => {
            if (value !== val && (!value.endsWith(".") || part.endsWith("."))) {
              possibleJigs.push(value);
            }
          });
        }
      });
      possibleJigs.forEach(jig => {
        jigs.forEach(address => {
          fullJig = "";
          valueParts = address["address"].split(" ");
          for (var i = 0; i < valueParts.length; i++) {
            fullJig += (i !== index ? valueParts[i] : jig) + " ";
          }
          fullJig = fullJig.substring(0, fullJig.length - 1);
          exists = false;
          jigs.forEach(existingAddress => {
            if (existingAddress["address"] === fullJig) {
              exists = true;
            }
          });
          if (!exists) {
            jigs.push({ address: fullJig, others: [] });
          }
        });
      });
    });
  }
  jigs.forEach(address => {
    jig = address["address"];
    if (!jig.includes("\n")) {
      units.forEach(unit => {
        address["others"].push(jig + "\n" + unit);
      });
    }
  });
  return jigs;
}
