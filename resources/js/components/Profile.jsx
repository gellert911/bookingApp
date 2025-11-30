import React, { useContext, useEffect, useState } from "react";
import Menu from "./Profile/Menu";
import Settings from "./Profile/Settings";
import Appointments from "./Profile/Appointments";
import { getUser } from "../api/user";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Profile () {
    const { userId } = useParams()
    const { user, loading, setUser, refreshUser } = useContext(UserContext);

    //const [user, setUser] = useState(null)
    const [selectedMenu, setSelectedMenu] = useState(0)

    const loadProfile = async () => {
        if (!user.is_admin) return; // Already loaded in user context

        try {
            // Get our user if we are have permission
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        loadProfile()
    }, [])

    return (

       <div className="d-flex">
            <aside>
                <Menu selectedMenu={selectedMenu}
                    setSelectedMenu={setSelectedMenu}
                    user={user}
                />
            </aside>


            <main className="flex-grow-1">
                {selectedMenu === 0 && (
                    <Settings user={user} onEdit={refreshUser}/>
                )}
                {selectedMenu === 1 && (
                    <Appointments user={user}/>
                )}
            </main>

            <aside>
            </aside>
       </div>
    )
}

export default Profile;