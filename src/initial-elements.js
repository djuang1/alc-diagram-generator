const jsonPayload = JSON.parse(
  '{"nodes":[{"id":"3af5d7fc-f2e4-4a1a-8f5a-4e6aa1091288","type":"http","label":"External Service Calls","labelSource":"api","layer":{"id":"c5eb9ab2-e80a-4392-bcf2-1caef0d0eda7","label":"Clients - external","order":4,"source":"api"},"systemLabel":"External Traffic","clientId":"OTHER"},{"id":"657e8462-da03-4650-aea1-5e0e573b0c7f","organizationId":"20c5aa85-9865-47d6-a6da-992cf2d1c162","environmentId":"7a69418c-102b-414a-83bc-148e76e91d2e","type":"mule","deploymentTarget":"cloudhub","label":"ordertocashsap","layer":{"id":"85a8409f-2a05-4299-b051-8ba9a87ed473","label":"Experience","order":10,"source":"api"},"systemLabel":"ordertocashsap","appName":"ordertocashsap","serverId":"worker-0","clusterId":"5ce83cde0fa261132179cdc5","host":"ordertocashsap.us-e2.cloudhub.io","muleVersion":"4.3.0"},{"id":"6cccb3c5-d68c-41bc-83a7-0a855e5afcd6","type":"other","label":"SAP IDP","labelSource":"api","layer":{"id":"752a3056-551a-4c6f-8fa5-f67e0c856e6c","label":"Backend application","order":13,"source":"api"},"systemLabel":"Sap","host":"Sap"},{"id":"76e460ad-8fea-45c4-943d-82c919fc858a","organizationId":"20c5aa85-9865-47d6-a6da-992cf2d1c162","environmentId":"7a69418c-102b-414a-83bc-148e76e91d2e","type":"mule","deploymentTarget":"cloudhub","label":"sap-snc-principal-propagation","systemLabel":"sap-snc-principal-propagation","appName":"sap-snc-principal-propagation","serverId":"worker-0","clusterId":"60c425d53c0700701e9a4ab0","host":"sap-snc-principal-propagation.us-e2.cloudhub.io","muleVersion":"4.3.0"},{"id":"7e1a315b-0a15-44fd-9e11-196f026d3b20","organizationId":"20c5aa85-9865-47d6-a6da-992cf2d1c162","environmentId":"7a69418c-102b-414a-83bc-148e76e91d2e","type":"mule","deploymentTarget":"cloudhub","label":"1platform-o2c-odata-api","systemLabel":"1platform-o2c-odata-api","appName":"1platform-o2c-odata-api","serverId":"worker-0","clusterId":"5efc96fc25dc3c32b0884329","host":"1platform-o2c-odata-api.us-e2.cloudhub.io","muleVersion":"4.3.0"},{"id":"cf6b5f63-795b-4f74-a84d-39e8e26ce2cf","type":"sfdc","label":"Salesforce","layer":{"id":"752a3056-551a-4c6f-8fa5-f67e0c856e6c","label":"Backend application","order":13,"source":"api"},"tags":[{"id":"65c614f1-d5da-4b3a-8b22-b4212fea65d9","label":"Cust360","source":"api"}],"systemLabel":"Salesforce","host":"Salesforce"}],"edges":[{"id":"6e7bb501-5e8c-47b5-b696-8c81a0aa0483","sourceId":"7e1a315b-0a15-44fd-9e11-196f026d3b20","targetId":"6cccb3c5-d68c-41bc-83a7-0a855e5afcd6"},{"id":"85dd3432-bee5-43ec-b5ce-fede8e30a2b9","sourceId":"3af5d7fc-f2e4-4a1a-8f5a-4e6aa1091288","targetId":"7e1a315b-0a15-44fd-9e11-196f026d3b20"},{"id":"aeb9cfc4-316f-4b87-9c4b-f614224049c6","sourceId":"3af5d7fc-f2e4-4a1a-8f5a-4e6aa1091288","targetId":"657e8462-da03-4650-aea1-5e0e573b0c7f"},{"id":"b13ddd69-fb7e-445f-80e2-e1fe43cb584f","sourceId":"657e8462-da03-4650-aea1-5e0e573b0c7f","targetId":"6cccb3c5-d68c-41bc-83a7-0a855e5afcd6"},{"id":"efb0ee86-0c36-4c52-be20-5e94e2d8af01","sourceId":"657e8462-da03-4650-aea1-5e0e573b0c7f","targetId":"cf6b5f63-795b-4f74-a84d-39e8e26ce2cf"}]}'
);
var createNodes = [];
var createEdges = [];
var xnodePosition = 0;
var ynodePosition = 0;
var layerStore = [];
var nodeLayerOrder;
var layerIndex;

for (var ii = 0; ii < jsonPayload.edges.length; ii++) {
  createEdges.push({
    id: jsonPayload.edges[ii].id,
    source: jsonPayload.edges[ii].sourceId,
    target: jsonPayload.edges[ii].targetId
  });
}

for (var i = 0; i < jsonPayload.nodes.length; i++) {
  // if 'order' exists
  if (jsonPayload.nodes[i].layer?.order) {
    nodeLayerOrder = jsonPayload.nodes[i].layer?.order;

    // if 'order' doesn't exist in the array, push it in
    if (!layerStore.includes(nodeLayerOrder)) {
      layerStore.push(nodeLayerOrder);
    } else {
      // else it already exists so the node should be placed 200px to the right
      xnodePosition = xnodePosition + 200;
    }
    // get index position instead of using order value
    layerIndex = layerStore.indexOf(nodeLayerOrder);

    ynodePosition = layerIndex * 100;
    xnodePosition = xnodePosition + 250;
  } else {
    ynodePosition = 300;
    xnodePosition = 250;
  }

  createNodes.push({
    id: jsonPayload.nodes[i].id,
    //type: 'group',
    data: {
      label: jsonPayload.nodes[i].label // + ":" + jsonPayload.nodes[i].layer?.order
    },
    position: {
      x: xnodePosition,
      y: ynodePosition
    }
  });
  xnodePosition = 0;
}

//const createNodes = (jsonPayload.nodes).map();
console.log(createNodes);
console.log(createEdges);

export const nodes = createNodes;
export const edges = createEdges;
/*export const nodes = [
  {
    id: jsonPayload.nodes[0].id,
    data: {
      label: jsonPayload.nodes[0].label,
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: {
      label: (
        <>
          This is a <strong>default node</strong>
        </>
      ),
    },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: {
      label: (
        <>
          This one has a <strong>custom style</strong>
        </>
      ),
    },
    position: { x: 400, y: 100 },
    style: {
      background: '#D6D5E6',
      color: '#333',
      border: '1px solid #222138',
      width: 180,
    },
  },
  {
    id: '4',
    position: { x: 250, y: 200 },
    data: {
      label: 'Another default node',
    },
  },
  {
    id: '5',
    data: {
      label: 'Node id: 5',
    },
    position: { x: 250, y: 325 },
  }
];

export const edges = [
  { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' },
  { id: 'e1-3', source: '1', target: '3' },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: true,
    label: 'animated edge',
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    label: 'edge with arrow head',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  }
];*/
