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
  ["boulevard", "blvd", "blvd."],
  ["mountain", "mtn.", "mtn"]
];

units = ["Unit A", "Unit B", "Unit C"];

prefixes = ["ABC", "EFG", "ABD", "XYZ", "DEF", "GHI"];

function jigAddress(addressString) {
  jigs = new Set([addressString]);
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
          valueParts = address.split(" ");
          for (var i = 0; i < valueParts.length; i++) {
            fullJig += (i !== index ? valueParts[i] : jig) + " ";
          }
          fullJig = fullJig.substring(0, fullJig.length - 1);
          jigs.add(fullJig);
        });
      });
    });
    if (parts.length >= 3) {
      jigs.forEach(address => {
        if (!address.includes("\n")) {
          addressParts = address.split(" ");
          for (var i = 2; i < addressParts.length; i++) {
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
  }
  return jigs;
}

function addUnitsToAddresses(addresses) {
  unitAddresses = new Set();
  addresses.forEach(address => {
    if (!address.includes("\n")) {
      units.forEach(unit => {
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
    prefixes.forEach(prefix => {
      newAddress = prefix + " " + addressParts[0];
      for (var i = 1; i < addressParts.length; i++) {
        newAddress += "\n" + addressParts[i];
      }
      newAddresses.add(newAddress);
    });
  });
  return newAddresses;
}
