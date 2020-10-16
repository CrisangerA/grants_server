class Log {
  static singleton

  constructor() {
    if (!!Log.singleton) {
      return Log.singleton;
    }
    Log.singleton = this;
  }
  static getInstance() {
    // if (!Log.singleton) {
    //   Log.singleton = new Log();
    // }
    // return Log.singleton;
    if (!!Log.singleton) {
      return Log.singleton;
    }
    Log.singleton = this;
  }
  createLog(e, origin) {
    console.log("============ LOG =============");
    console.log(origin)
    console.log(typeof e);
    console.log(e.code);
    console.log(e.message);
    console.log(e);
  }
}

export default new Log();