/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 2/24/20
 */

(async () => {
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
  // tslint:disable-next-line:no-console
  console.log('Hello TS!');

  // Keep running
  setInterval(() => {/**/}, 1000);
})();
