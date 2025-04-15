export const formatCurrency = (text: string) => {
    const numericText = text.replace(/\D/g, '');
    const number = parseFloat(numericText) / 100;
  
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
};