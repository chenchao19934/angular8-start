/**
 * 获取URL指定key的参数值
 * @param {string} key
 * @returns {string}
 */
export function getQueryString(key: string): string {
  let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return '';
}

export function prototypeFun() {
  Date.prototype['format'] = function format(fmt: string) {
    if (Object.prototype.toString.call(this) !== '[object Date]') {
      throw new Error('this caller must be a Date type.')
    }
    if (!fmt) fmt = 'YYYY-MM-DD HH:mm:ss:SSS'
    let d: Date = this
    let o = {
      'Y+': d.getFullYear(),
      'M+': (d.getMonth() + 1),
      'D+': d.getDate(),
      'H+': d.getHours(),
      'm+': d.getMinutes(),
      's+': d.getSeconds(),
      'S+': d.getMilliseconds()
    }
    for (let k in o) {
      let matched = fmt.match(k)
      let _k = matched ? matched[0] : null
      fmt = fmt.replace(_k, (o[k] > 9 ? o[k] : '0' + o[k]))
    }
    return fmt
  }
}

/**
 * 把指定日期弄成 'YYYYMMDD' 格式
 * @param {Date} date JS日期对象
 * @param {string} split 分隔符 默认没有
 * @returns {string} 'YYYYMMDD' 格式的日期
 * @author chenchao
 */
export function getYYYYMMDD(date: Date, split: string = ''): string {
  if (!date) {
    return;
  }
  let year = date.getFullYear() + '';
  let month = date.getMonth() + 1;
  let monthStr = month < 10 ? '0' + month : '' + month;
  let dateN = date.getDate();
  let dateStr = dateN < 10 ? '0' + dateN : '' + dateN;
  return [year, monthStr, dateStr].join(split);
}

/**
 * 把今天的日期弄成 'YYYYMMDD' 格式
 * @returns {string}
 * @author chenchao
 */
export function getTodayYYYYMMDD() {
  return getYYYYMMDD(new Date());
}

/**
 * 把昨天的日期弄成 'YYYYMMDD' 格式
 * @returns {string}
 * @author chenchao
 */
export function getYesterdayYYYYMMDD() {
  let today = new Date();
  let yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  return getYYYYMMDD(yesterday);
}

/**
 * 格式化时间为 YYYYMMDD
 * @param ms 毫秒数
 */
export function formatDateToYYYYMMDD(ms: any, symbol = '') {
  let oDate = new Date(ms);
  let dateArr = [oDate.getFullYear(), addZero(oDate.getMonth() + 1), addZero(oDate.getDate())]

  return dateArr.join(symbol);
}

/**
 * 格式化时间为 YYYYMMDDHHmmss
 * @param ms 毫秒数
 */
export function formatDateToYYYYMMDDHHmmss(ms: any, symbol = '') {
  let oDate = new Date(ms);
  let time = addZero(oDate.getHours()) + ':' + addZero(oDate.getMinutes()) + ':' + addZero(oDate.getSeconds());
  let dateArr = [oDate.getFullYear(), addZero(oDate.getMonth() + 1), addZero(oDate.getDate())];

  return dateArr.join(symbol) + ' ' + time;
}

/**
 * 格式化时间为 YYYY年MM月DD日
 * @param ms 毫秒数
 */
export function formatDateToChinese(ms: any) {
  let oDate = new Date(ms);

  return oDate.getFullYear() + '年' + addZero(oDate.getMonth() + 1) + '月' + addZero(oDate.getDate()) + '日';
}

/**
 * 月份，日的补零
 */
function addZero(num: any) {
  if (parseInt(num, 10) < 10) {
    num = '0' + num;
  }
  return String(num);
}

/**
 * 日期范围转程所有天的数组
 * @param start 开始的毫秒数
 * @param end 结束的毫秒数
 * @param util 时间粒度
 */
export function dateRangeToDateArr(start: any, end: any, util = 1) {
  // 定义一天的毫秒数
  const dayMilliSeconds = 1000 * 60 * 60 * 24 * util;

  // 定义返回值
  let ret = [];

  // 对日期毫秒数进行循环比较，直到start 大于等于 end 时退出循环
  // 每次循环结束，给start 增加时间
  for (start; start <= end; start += dayMilliSeconds) {
    ret.push(formatDateToYYYYMMDD(start));
  }

  return ret;
}

/**
 * @description 将时间戳转换为 YYYY/MM/DD hh-mm-ss
 * @param {string} timeStamp - 时间戳
 * @returns {string}
 * @author chenfengami
 */
export function timeStampToTime(timeStamp: string, isNeedSeconds?: boolean): string {
  const date = new Date(+timeStamp * (timeStamp.length === 13 ? 1 : 1000));
  const year = date.getFullYear();
  let month: number | string = date.getMonth() + 1;
  let day: number | string = date.getDate();
  let hour: number | string = date.getHours();
  let minute: number | string = date.getMinutes();
  let second: number | string = date.getSeconds();
  month = addZero(month);
  day = addZero(day);
  hour = addZero(hour);
  minute = addZero(minute);
  second = addZero(second);
  return `${year}-${month}-${day} ${hour}:${minute}${isNeedSeconds ? ':' + second : ''}`;
}

/**
 * @desc 将Date转换为日期格式
 * @param date 日期
 * @param full 是否显示时分秒
 * @returns {string}
 */
export function dateToString(date: Date, full = true): string {
  const year = date.getFullYear();
  let month: number | string = date.getMonth() + 1;
  let day: number | string = date.getDate();
  let hour: number | string = date.getHours();
  let minute: number | string = date.getMinutes();
  let second: number | string = date.getSeconds();
  month = month > 9 ? month : `0${month}`;
  day = day > 9 ? day : `0${day}`;
  hour = hour > 9 ? hour : `0${hour}`;
  minute = minute > 9 ? minute : `0${minute}`;
  second = second > 9 ? second : `0${second}`;
  return full ? `${year}-${month}-${day} ${hour}:${minute}:${second}` : `${year}-${month}-${day}`;
}

/**
 * 把两个 Object 深度合并。把 source 合并到 target
 * @param {object|array} target 目标 object（或 array）
 * @param {object|array} source 要合并的 object（或 array）
 * @returns {object|array} target 把 target 返回
 * @author chenchao
 */
export function deepAssign(target: object, source: object) {
  let keys = Object.keys(source);
  for (let key of keys) {
    if (
      target.hasOwnProperty(key) &&
      typeof target[key] === 'object' &&
      typeof source[key] === 'object'
    ) {
      deepAssign(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}


/**
 * 转换对象为URL参数形式的方法
 * @param {obj}
 * @returns {string}
 * @author zyj
 */
export function tranformParams(obj: { [x: string]: any; }) {
  var query = '',
    name,
    value,
    fullSubName,
    subName,
    subValue,
    innerObj,
    i;
  for (name in obj) {
    value = obj[name];
    if (value instanceof Array) {
      for (i = 0; i < value.length; ++i) {
        subValue = value[i];
        fullSubName = name + '[' + i + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += tranformParams(innerObj) + '&';
      }
    } else if (value instanceof Object) {
      for (subName in value) {
        subValue = value[subName];
        fullSubName = name + '[' + subName + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += tranformParams(innerObj) + '&';
      }
    } else if (value !== undefined && value !== null)
      query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
  }
  return query.length ? query.substr(0, query.length - 1) : query;
}

/**
 * 判断是否为空对象或者空数组
 * @param {object|array} object
 * @returns {boolean}
 */
export function isEmpty(object: any) {
  if (Array.isArray(object)) {
    return object.length ? false : true;
  } else {
    for (let name in object) {
      return false;
    }
  }
  return true;
}

/**
 * @desc 数据类型检测
 * @param obj 待检测的数据
 * @return {String} 类型字符串
 */
export function type(obj: any) {
  return typeof obj !== 'object' ? typeof obj : Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}