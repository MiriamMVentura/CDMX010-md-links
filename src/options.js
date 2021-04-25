// -- estadisticas
const optionStats = (linksArr) => {
  const totalLinks = linksArr.length;
  const uniqueLinks = [...new Set(linksArr.map((links) => links.href))].length;
  console.log({ total: totalLinks, unique: uniqueLinks })
  return { total: totalLinks, unique: uniqueLinks };
};
// optionStats(getLinksFromMd('./directory/prueba.md'))

// -- estadisticas y validaciones
const statsAndValidate = (linksArr) => {
  const totalLinks = linksArr.length;
  const uniqueLinks = [...new Set(linksArr.map((links) => links.href))].length;
  const brokenLinks = linksArr.filter((element) => element.status >= 400).length;
  console.log({ total: totalLinks, unique: uniqueLinks, broken: brokenLinks })
  return { total: totalLinks, unique: uniqueLinks, broken: brokenLinks };
};
// statsAndValidate(getLinksFromMd('./directory/prueba.md'))

module.exports = {
  optionStats,
  statsAndValidate,
};
