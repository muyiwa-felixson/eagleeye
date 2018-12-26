/**
 * @file urls 
 */
export const baseurl = 'http://localhost:3333/eagleeye/api';
export const urls = { 
     postProject: `${baseurl}/item`,
     allProjects: `${baseurl}/item?dbname=project`,
     getProject: ({id, rev})=> `${baseurl}/item?dbname=project&id=${id}&rev=${rev}`,
     postSingleMedia: `${baseurl}/upload`,
     postMultipleMedia: `${baseurl}/upload/media`
 }
