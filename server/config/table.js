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
   permissions: {
      officer: [
         'Can create users',
         'Can edit users',
         'Can delete users',
         'Can create projects',
         'Can edit projects',
         'Can delete projects',
         'Can create reports',
         'Can edit reports',
         'Can delete reports',
         'Can approve reports',
         'Can initiate payments'
      ] ,
       superuser: [
          'Can create users',
          'Can edit users',
          'Can delete users',
          'Can create projects',
          'Can edit projects',
          'Can delete projects',
          'Can create reports',
          'Can edit reports',
          'Can delete reports',
          'Can approve reports',
          'Can initiate payments'
       ] ,
      administrator: [
         'Can create projects',
         'Can edit projects',
         'Can delete projects',
         'Can create reports',
         'Can edit reports',
         'Can delete reports',
         'Can approve reports',
         'Can initiate payments'   
      ],
      projectCreator: [
         'Can create projects',
         'Can edit projects',
         'Can create reports',
      ],
      paymentCreator: [
         'Can initiate payments'    
      ]    

   },

};
