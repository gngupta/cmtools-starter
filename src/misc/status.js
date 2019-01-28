const StatusEnum = function() {
  const statusEnum = {};
  
  statusEnum.OK = 'OK';
  statusEnum.PENDING = 'PENDING';
  statusEnum.ERROR = 'ERROR';

  return Object.freeze(statusEnum);
};
  
export default StatusEnum;