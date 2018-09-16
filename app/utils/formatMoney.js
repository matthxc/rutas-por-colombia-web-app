class FormatMoney {
  constructor() {}

  formattedMoney(number) {
    return this.formatMoney(number);
  }

  formatMoney(n) {
    return `$ ${n.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`;
  }
}

export default FormatMoney;
