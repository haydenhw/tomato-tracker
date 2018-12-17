import axios from 'axios';

const entry = {
  taskName: 'A new one',
  startTime: 1544927769092,
  endTime: 1544927769892,
  recordedTime: 600,
  parentProjectName: 'Your Father',
};

 async function requestLogs() {
  const { data } = await axios.get('http://localhost:3002/log');
  return data;
}

const postLogs = (data) => (
  axios.post('http://localhost:3002/log', data)
);

test('fetch logs',  async function() {
  const logs = await requestLogs();
  expect(true).toBe(true);
});

test('post logs',  async function() {
  postLogs(entry);
  const logs = await requestLogs();
  console.log(logs);
  expect(true).toBe(true);
});
