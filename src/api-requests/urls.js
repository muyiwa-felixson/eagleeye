/**
 * @file urls 
 */
 export const baseurl = 'http://localhost:3333/eagleeye/api/item';
export const urls = { 
     allProjects: `${baseurl}?dbname=project`,
     getProject: ({id, rev})=> `${baseurl}?dbname=project&id=${id}&rev=${rev}`
 }
