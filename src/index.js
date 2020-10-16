import server from './server';

const main = async () => {
  await server.listen(server.get('port'));
  console.log(`Server on Port: ${server.get('port')}`);
}
main();