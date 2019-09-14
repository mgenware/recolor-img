const { promisify } = require('util');
const { stat } = require('fs');
const { types } = require('../package.json');
const assert = require('assert');
const statAsync = promisify(stat);

it('Verify type definition files', async () => {
  assert.ok((await statAsync(types)).isFile());
});
