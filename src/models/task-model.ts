export enum TASK_TYPES {
  DAILY_LOGIN = 'DAILY_LOGIN',
  DAILY_INVITE = 'DAILY_INVITE',
  DAILY_CHECKIN = 'DAILY_CHECKIN',
  X_FOLLOW = 'X_FOLLOW',
  X_RETWEET = 'X_RETWEET',
  DISCORD_JOIN = 'DISCORD_JOIN',
  TELE_JOIN = 'TELE_JOIN',
}

export interface ITask {
  type: TASK_TYPES;
  points: number;
  completed: boolean;
}
