/**
 * Define tables needed by the app 
 * used to create tables if they dont exist 
 */
module.exports = {
   tables : [
       'payment', 'report', 'project', 'category', 'contractor', 'user', 'permissions'
   ],
   groups: [
      'superuser', 'adminstrator', 'contractor', 'officer'
   ],
   permissions: [
       'isOwner', 'isSuperuser', 'isadmin'
   ]
};