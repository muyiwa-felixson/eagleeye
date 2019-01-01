/**
 * Define tables needed by the app 
 * used to create tables if they dont exist 
 */
module.exports = {
   tables : [
      'project', 'contractor', 'user', 'permissions'
   ],
   groups: [
      'superuser', 'adminstrator', 'projectCreator', 'paymentCreator'
   ],
   permissions: [
       'isOwner', 'isSuperuser', 'isadmin'
   ]
};