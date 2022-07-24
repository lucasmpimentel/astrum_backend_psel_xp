const calculateDate = (apiDate: string) => {
  const d = apiDate;
  const formatedDate =
    Number(d[0] + d[1] + d[2] + d[3]) +
    '-' +
    Number(d[4] + d[5]) +
    '-' +
    Number(d[6] + d[7]);
  const closeDate = new Date(formatedDate);
  const today = new Date();

  return closeDate > today;
};

const calculateBalance = (
  qtdAtivo: number,
  valorAtivo: string,
  clientBalance: string,
) => {
  const transactionValue = (Number(qtdAtivo) * Number(valorAtivo)).toFixed(2);
  console.log(transactionValue);
  const newBalance = (Number(clientBalance) - Number(transactionValue)).toFixed(
    2,
  );
  return Number(newBalance);
};

export default {
  calculateDate,
  calculateBalance,
};
