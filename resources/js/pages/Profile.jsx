import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "@/context/UserContext";
import { getUser } from "@/api/user";

import Menu from "./profile/Menu";
import Settings from "./profile/Settings";
import Appointments from "./profile/Appointments";

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
        <div className="container">
            <div className="d-sm-none d-block">
                <Menu selectedMenu={selectedMenu}
                    setSelectedMenu={setSelectedMenu}
                />
            </div>
            <div className="d-flex">
                    <aside className="d-none d-sm-block">
                        <Menu selectedMenu={selectedMenu}
                            setSelectedMenu={setSelectedMenu}
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
        </div>
    )
}

export default Profile;