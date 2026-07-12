import React from 'react'

const Profile = () => {
    return (
        <div>
            <h2>Profile Information</h2>

            <div>
                <label>First Name</label>
                <br />
                <input
                    type="text"
                    placeholder="Enter first name"
                />
            </div>

            <br />

            <div>
                <label>Last Name</label>
                <br />
                <input
                    type="text"
                    placeholder="Enter last name"
                />
            </div>

            <br />

            <div>
                <label>Phone Number</label>
                <br />
                <input
                    type="text"
                    placeholder="Enter phone number"
                />
            </div>

        </div>
    )
}

export default Profile