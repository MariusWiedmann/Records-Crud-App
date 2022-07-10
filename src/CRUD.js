import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';



export default function CRUD () {
    //READ FUNCTIONALITY
    //Grabs our data from the mockAPI
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
    axios.get(`https://62c6f8c374e1381c0a6e3903.mockapi.io/albumDataCRUD`)
        .then((response) => {
            setAPIData(response.data);
        })
    }, [])

    const setData = (data) => {
        let { id, albumName, artistName, genre, releaseYear } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('Album Name', albumName);
        localStorage.setItem('Artist Name', artistName);
        localStorage.setItem('Genre', genre);
        localStorage.setItem('Release Year', releaseYear);
    }

    //CREATE FUNCTIONALITY
    //Methods for pushing new information to the API and table

    const [albumName, setAlbumName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [genre, setGenre] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const postData = () => {
        axios.post(`https://62c6f8c374e1381c0a6e3903.mockapi.io/albumDataCRUD`, {
            albumName,
            artistName,
            genre,
            releaseYear
        }).then(() => {
            window.location.reload();
        })
    }

    //DELETE FUNCTIONALITY
    //Methods for deleting data and re-updating it 
    const getData = () => {
        axios.get(`https://62c6f8c374e1381c0a6e3903.mockapi.io/albumDataCRUD`)
            .then((getData) => {
                setAPIData(getData.data);
        })
    }

    const onDelete = (id) => {
        axios.delete(`https://62c6f8c374e1381c0a6e3903.mockapi.io/albumDataCRUD/${id}`)
        .then(() => {
            getData();
        })
    }

    //EDIT FUNCTIONALITY
    //Methods to do inline editing



    return(
        <div>
            <table className="table table-striped table-dark">
            <thead>
                    <tr>
                        <td><input className="form-control" placeholder="Album Name" onChange={(e) => setAlbumName(e.target.value)}/></td>
                        <td><input className="form-control" placeholder="Artist Name" onChange={(e) => setArtistName(e.target.value)}/></td>
                        <td><input className="form-control" placeholder="Genre" onChange={(e) => setGenre(e.target.value)}/></td>
                        <td><input className="form-control" placeholder="Release Year" onChange={(e) => setReleaseYear(e.target.value)}/></td>
                        <td><button className="btn btn-success" onClick={postData} type='submit'>Submit</button></td>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <td><h3>Album Name</h3></td>
                        <td><h3>Artist Name</h3></td>
                        <td><h3>Genre</h3></td>
                        <td><h3>Release Year</h3></td>
                    </tr>
                </thead>
                <tbody>
                    {APIData.map((data) => {
                        return (
                            <tr>
                                <td><div contentEditable="true">{data.albumName}</div></td>
                                <td><div contentEditable="true">{data.artistName}</div></td>
                                <td><div contentEditable="true">{data.genre}</div></td>
                                <td><div contentEditable="true">{data.releaseYear}</div></td>
                                <td><button className="btn btn-danger" onClick={() => onDelete(data.id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
        </div>
    )
}