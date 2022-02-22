const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const servicePage = path.resolve('src/templates/service.js');
  const versionPage = path.resolve('src/templates/version.js');
  const operationPage = path.resolve('src/templates/operation.js');

  return graphql(`
    query {
      allSamplesJson {
        edges {
          node {
            apiInfo {
              title
              version
            }
            generated {
              operationId
              csharpModel
              csharpSnippet
              javaModel
              javaSnippet
              pythonModel
              pythonSnippet
              requestBody
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) throw result.errors;

    const services = [];

    result.data.allSamplesJson.edges.forEach((edge) => {
      const { apiInfo, generated } = edge.node;
      const { title, version } = apiInfo;

      const service = services.find((s) => s.title === title);
      if (service) {
        service.versions.push(version);
      } else {
        services.push({ title, versions: [version] });
      }

      createPage({
        path: `${title}/${version}`,
        component: versionPage,
        context: {
          service: title,
          version,
          generated,
        },
      });

      generated.forEach((operation) =>
        createPage({
          path: `${title}/${version}/${operation.operationId}`,
          component: operationPage,
          context: {
            service: title,
            version,
            operation,
          },
        })
      );
    });

    services.forEach(({ title, versions }) => {
      createPage({
        path: title,
        component: servicePage,
        context: {
          title,
          versions,
        },
      });
    });
  });
};
