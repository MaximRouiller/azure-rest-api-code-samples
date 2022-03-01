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
            service
            version
            specName
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
      const { service, specName, generated } = edge.node;
      let version = edge.node.version;
      version = service.toLowerCase() !== specName ? `${version} (${specName})` : version;

      const serviceVersions = services.find((s) => s.service === service);
      if (serviceVersions) {
        serviceVersions.versions.push(version);
      } else {
        services.push({ service, versions: [version] });
      }

      createPage({
        path: `${service}/${version}`,
        component: versionPage,
        context: {
          service,
          version,
          generated,
        },
      });

      generated.forEach((operation) =>
        createPage({
          path: `${service}/${version}/${operation.operationId}`,
          component: operationPage,
          context: {
            service,
            version,
            operation,
          },
        })
      );
    });

    services.forEach(({ service, versions }) => {
      createPage({
        path: service,
        component: servicePage,
        context: {
          service,
          versions,
        },
      });
    });
  });
};
