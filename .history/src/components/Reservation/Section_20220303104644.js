
import React, { useEffect, useState } from 'react';
import jwt from 'jwt-decode'
export 
const storage = JSON.parse(localStorage.getItem("user"))
const token = storage.token
const user = jwt(token)