const { BigNumber } = require("ethers");
const factions = Math.pow(10, 18);

BigNumber.prototype.hexToDecimal = function () {
  return Number(this.toBigInt()) / factions;
};
BigNumber.prototype.hexToNumber = function () {
  return Number(this.toBigInt());
};
Number.prototype.notFloatingComma = function () {
  return this.toFixed(8).replace(/\.?0+$/, "");
};
String.prototype.formatBenhAn = function () {
  return this.replace(/(--)|(tét)/g, function (str, p1, p2) {
    if (p1) return "";
    if (p2) return "";
  }).split(/[\n\"]/g);
};

Array.prototype.reduceByKey = function (key) {
  return this.reduce((a, b) => a + b[key], 0);
};

Number.prototype.formatCurrency = function () {
  return this.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
    currency: "USD",
  });
};
Number.prototype.onlySecondDigist = function () {
  return ("0" + this).slice(-2);
};

Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key))
}