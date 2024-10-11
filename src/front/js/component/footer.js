import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";


export const Footer = () => {
    return (
        <div className="footer">
            <div className="contenedorCafe">
                <a href='https://cafecito.app/chefathome' rel='noopener' target='_blank' className="cafecito">
                    <img
                        srcSet='https://cdn.cafecito.app/imgs/buttons/button_1.png 1x, https://cdn.cafecito.app/imgs/buttons/button_1_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_1_3.75x.png 3.75x'
                        src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/83f8917b-ec5f-47f9-8a38-ce53c7143586/dbiwk9a-bfee3cb8-34b0-401f-b4d0-0391a53e7ef0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzgzZjg5MTdiLWVjNWYtNDdmOS04YTM4LWNlNTNjNzE0MzU4NlwvZGJpd2s5YS1iZmVlM2NiOC0zNGIwLTQwMWYtYjRkMC0wMzkxYTUzZTdlZjAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Zh0shR2rDewVRUElCwg6f1lB3XX0GJtXzzbp9bg8Oik'
                        alt='Invitame un café en cafecito.app'
                    />
                </a>
            </div>
        </div>
    );
};