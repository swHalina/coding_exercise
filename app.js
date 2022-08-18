/*
    Developer Name: Maria Lucian Suarez Villanueva
    Date of development: August 17th, 2022
    Purpose: This script can iterate an array of object and add the execution date to each object, 
    show only active ones,
    order by a property and print a messages if the array does not have any active records.
// */

import fetch from 'node-fetch';

// The EndPoint from which the data is taken is declared
const url = "http://74.208.182.108:3900/api/usuarios";

// Data request starts
const getData = async () => {

    // Time interval between requests
    setTimeout(async () => {
        const peticion = await fetch(url);
        const data = await peticion.json();

        let users = data.usuarios;

        // Select one of the following properties: "name", "movie", "date" with which you want to filter the list.
        let property = "name";

        // Select one of the following properties: "Active" for active users or "Inactive" for inactive users list.
        let status = "Active";


        // Iterate the array to add the execution date and select active ones
        let activeObject = [];
        users.forEach(object => {
            object['Date'] = Date();
            if (object['Status'] === status) {
                activeObject.push({
                    name: object['Name'],
                    movie: object['Favorite Movie'],
                    date: object['Date']
                })
            }
        });

        //Definition of the sort function
        const orderByProperty = (property) => {
            let order = 0;

            return function (a, b) {
                if (a[property] > b[property]) {
                    order = 1;
                }
                else if (a[property] < b[property]) {
                    order = -1;
                }
                return order
            }
        }

        //If the activeObject array is empty means that doesn't have active users
        if (activeObject.length === 0) {
            console.log('No Active Users');
        }
        else {
            const propertyActive = property;
            console.log(`Active Users order by ${propertyActive}`)
            console.log(activeObject.sort(orderByProperty(property)));
        }

        clearInterval(setTimeout);
    }, 1000)

}

getData();