TRANSLATIONS = [
  ["street", "st.", "st"],
  ["drive", "dr.", "dr"],
  ["lane", "ln.", "ln"],
  ["avenue", "ave.", "ave"],
  ["west", "w.", "w"],
  ["east", "e.", "e"],
  ["north", "n.", "n"],
  ["south", "s.", "s"],
  ["east", "e.", "e"],
  ["boulevard", "blvd", "blvd."],
  ["mountain", "mtn.", "mtn"]
];

UNITS = ["Unit A", "Unit B", "Unit C"];

PREFIXES = ["ABC", "XYZ", "AAA", "BBB", "CCC", "DDD"];

function jigAddress(addressString) {
  jigs = new Set([addressString]);
  lines = addressString.split("\n");
  parts = lines[0].split(" ");
  console.log("Address Lines: " + lines);
  console.log("Address parts: " + parts);
  for (var index = 0; index < parts.length; index++) {
    part = parts[index];
    TRANSLATIONS.forEach(entry => {
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
          valueLines = address.split("\n");
          valueParts = valueLines[0].split(" ");
          for (var i = 0; i < valueParts.length; i++) {
            fullJig += (i !== index ? valueParts[i] : jig) + " ";
          }
          fullJig = fullJig.substring(0, fullJig.length - 1);
          for (var i = 1; i < valueLines.length; i++) {
            fullJig += "\n" + valueLines[i];
          }
          jigs.add(fullJig);
        });
      });
    });
  }
  if (parts.length >= 3) {
    jigs.forEach(address => {
      if (lines.length == 1 && !address.includes("\n")) {
        addressParts = address.split(" ");
        for (var i = 2; i < addressParts.length; i++) {
          if (addressParts.length == 3) {
            if (addressParts[2].length < 3) {
              continue;
            }
          }
          splitAddress = "";
          for (var j = 0; j < i; j++) {
            splitAddress += addressParts[j] + " ";
          }
          splitAddress =
            splitAddress.substring(0, splitAddress.length - 1) + "\n";
          for (var j = i; j < addressParts.length; j++) {
            splitAddress += addressParts[j] + " ";
          }
          jigs.add(splitAddress.substring(0, splitAddress.length - 1));
        }
      }
    });
  }
  return jigs;
}

function addUnitsToAddresses(addresses) {
  unitAddresses = new Set();
  addresses.forEach(address => {
    if (!address.includes("\n")) {
      UNITS.forEach(unit => {
        unitAddresses.add(address + "\n" + unit);
      });
    }
  });
  return unitAddresses;
}

function addPrefixesToAddresses(addresses) {
  newAddresses = new Set();
  addresses.forEach(address => {
    addressParts = address.split("\n");
    PREFIXES.forEach(prefix => {
      newAddress = prefix + " " + addressParts[0];
      for (var i = 1; i < addressParts.length; i++) {
        newAddress += "\n" + addressParts[i];
      }
      newAddresses.add(newAddress);
    });
  });
  return newAddresses;
}