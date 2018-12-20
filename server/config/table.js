/**
 * Define tables needed by the app 
 * used to create tables if they dont exist 
 */
const STRING = 'string';
const URL = 'url';
const BOOLEAN = 'boolean';
const DATETIME = 'datetime';
const RELATION = '@relation';
const MANY = '@Many';
const ONE = '@one';
const AT = '@';
module.exports = {
    user: {
        tablename: 'User',
        feilds: {
            email: STRING,
            firstname: STRING,
            lastname: STRING,
            password: STRING,
            profileId: STRING,

            token: STRING
        },
        primaryId: 'email',
        containImage: 'No'
    },
    profile: {
        tablename: 'profile',
        feilds: {
            userId: STRING + RELATION + AT + 'User' + ONE,
            followsId: STRING + RELATION + AT + 'Follow' + MANY,
            mentorsId: STRING + RELATION + AT + 'Mentors' + MANY,
            menteesId: STRING + RELATION + AT + 'Mentors' + MANY,
            eventsAttendingId: STRING + RELATION + AT + 'Events' + MANY,
            eventsOrganizingId: STRING + RELATION + AT + 'Events' + MANY,
            myInvitesId: STRING + RELATION + AT + 'Invites' + MANY,
            sentInvitesId: STRING + RELATION + AT + 'Invites' + MANY,
            notificationsId: STRING + RELATION + AT + 'Notifications' + MANY,
            postId: STRING + RELATION + AT + 'Notifications' + MANY,
            bio: STRING,
            address: STRING,
            country: STRING,
            state: STRING,
            lga: STRING,
            profilePicture: URL,
            telephone: STRING
        },
        primaryId: '',
        containImage: 'YES'
    },
    notifications: {
        tablename: 'notifications',
        feilds: {
            userId: STRING + RELATION + AT + 'User' + ONE,
            type: STRING,
            typeId: STRING,
            status: STRING,
            summary: STRING,
            date: DATETIME,
            thumbnail: STRING
        },
        primaryId: '',
        containImage: 'NO'

    },

};