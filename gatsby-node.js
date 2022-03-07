const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const servicePage = path.resolve('src/templates/service.js');
  const versionPage = path.resolve('src/templates/version.js');
  const operationGroupPage = path.resolve('src/templates/operationGroup.js');
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
      const serviceNameEqualsSpecName = service.toLowerCase() === specName.toLowerCase();
      const version = edge.node.version + (serviceNameEqualsSpecName ? '' : ` (${specName})`);

      const serviceVersions = services.find((s) => s.service === service);
      if (serviceVersions) {
        serviceVersions.versions.push(version);
      } else {
        services.push({ service, versions: [version] });
      }

      const operationGroups = [];

      generated.forEach((operation) => {
        const { operationId } = operation;
        const [groupName, operationName] = operationId
          .split('_')
          .map((name) => name.split(/(?=[A-Z])/).join('-'));

        const group = operationGroups.find((group) => group.groupName === groupName);
        if (group) {
          group.operations.push(operationName);
        } else {
          operationGroups.push({ groupName, operations: [operationName] });
        }

        createPage({
          path: `${service}/${version}/${groupName}/${operationName}`,
          component: operationPage,
          context: {
            pageTitle: `${service} - ${version} - ${groupName} - ${operationName}`,
            operation,
          },
        });
      });

      operationGroups.forEach(({ groupName, operations }) => {
        createPage({
          path: `${service}/${version}/${groupName}`,
          component: operationGroupPage,
          context: {
            pageTitle: `${service} - ${version} - ${groupName}`,
            operations,
          },
        });
      });

      createPage({
        path: `${service}/${version}`,
        component: versionPage,
        context: {
          pageTitle: `${service} - ${version}`,
          operationGroups: operationGroups.map((group) => group.groupName),
        },
      });
    });

    services.forEach(({ service, versions }) => {
      createPage({
        path: service,
        component: servicePage,
        context: {
          pageTitle: service,
          versions,
        },
      });
    });
  });
};
