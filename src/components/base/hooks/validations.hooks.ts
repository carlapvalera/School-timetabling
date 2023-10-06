import { BaseSchedule, Dictionary, Schedule } from '../models/basic';
import { Notify } from 'quasar';


export const twoSubjectInSameRoom = (
  sch: Schedule,
  baseScheduleChange: BaseSchedule
) => {
  // TODO: Fix here
  
  const schedules: BaseSchedule[] = [];
  for(let i=0; i<sch.schedule.length; i++){
    if(sch.schedule[i].room == baseScheduleChange.room && sch.schedule[i].day == baseScheduleChange.day && sch.schedule[i].hour == baseScheduleChange.hour){
      schedules.push(sch.schedule[i]);
    }
  }
 
  for(let i=0; i<schedules.length; i++){
    if(schedules[i].subject != baseScheduleChange.subject){
      Notify.create({
        type: 'negative',
        message: `No se puede impartir ${schedules[i].subject} y ${baseScheduleChange.subject} al mismo tiempo`
      });
      return false;
    }
  }
  
  return true;
};


export const classType = (sch: Schedule, baseScheduleChange: BaseSchedule) => {
  // TODO: Fix here
  const schedules: BaseSchedule[] = [];

  for(let i=0; i<sch.schedule.length; i++){
  
    if(sch.schedule[i].room == baseScheduleChange.room && sch.schedule[i].day == baseScheduleChange.day && sch.schedule[i].hour == baseScheduleChange.hour){
      schedules.push(sch.schedule[i]);
    }
  }
 
  for(let i=0; i<schedules.length; i++){
    if(schedules[i].cp != baseScheduleChange.cp){
      Notify.create({
        type: 'negative',
        message: `No se puede impartir una cp y una conferencia al mismo tiempo`
      });
      return false;
    }
  }
  return true;
};

export const validationFunctionMapped: Dictionary<
  (sch: Schedule, baseScheduleChange: BaseSchedule) => boolean
> = {
  twoSubjectInSameRoom: twoSubjectInSameRoom,
  classType: classType
};

export const validationFunction = (
  sch: Schedule,
  baseScheduleChange: BaseSchedule
) => {
  let result = true
  sch.config.validationFunctions.forEach((funcKey) => {
    if (!!validationFunctionMapped[funcKey]) {
      const answ = validationFunctionMapped[funcKey](
        sch,
        baseScheduleChange
      );
      if (!answ) {result = false;}
    }
  });
  
  return result;
};
