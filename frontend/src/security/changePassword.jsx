import { useState, useEffect } from "react";
import { useCSRF } from "../Contexts/CsrfContext";
import Fond from '../utile/style.jsx';
import { useNavigate } from "react-router";
import { handleChange,verifMotDePasse,contientPasMajetMin } from "./registration.jsx";

export function ChangePasswordForm(){
    const navigate=useNavigate()
    
    const {csrfToken}=useCSRF()
    const [Password,setPassword]=useState('')
    const [NewPassword,setNewPassword]=useState("")
    const [CNewPassword,setCNewPassword]=useState("") //confirmation du nouveau mot de passe
    const [erreurs,setErreurs]=useState({grosseErreur:"",CNewPasswordErreur:"",PasswordErreur:"",NewPasswordErreur:""})
    const [isErreur,setIsErreur]=useState(false) //sert à définir s'il y a eu une erreur
    const handleEnterKey = (event,csrfToken,setErreurs,champs,navigate,isErreur,setIsErreur) =>{
        if (event.key==="Enter"){
          event.preventDefault()
          console.log(champs)
          submit(csrfToken, setErreurs,champs, navigate,isErreur,setIsErreur)
        }
      }
    
    useEffect(()=>{
        checkErreurs(Password,NewPassword,CNewPassword,setErreurs,csrfToken,setIsErreur)
        setIsErreur(false)

    },[Password,NewPassword,CNewPassword])
    useEffect(()=>{
      setErreurs(etatPrec=>({
        ...etatPrec,
        PasswordErreur:""
      }))
    },[Password])
    
    return (
        
          <>
          <Fond>
            
              
    
              {/* Registration Form Section */}
              <div className="d-flex align-items-center justify-content-center"> {/*mettre col-md-6 + une image si vous voulez en utiliser une */}
              <div className="w-75 position-relative">
                

                <h2 className="mb-3 fw-bold fs-2">Changer votre mot de passe</h2>
                <p className="text-muted mb-4">Veuillez saisir votre ancien mot de passe et définir un nouveau mot de passe.</p>

                  {/* Large Error Message */}
                  {erreurs.grosseErreur && (
                    <div className="alert alert-danger mb-4" role="alert">
                      {erreurs.grosseErreur}
                    </div>
                  )}
    
                  <form>
                    
    
                    
    
                    
    
                    
    
                    <div className="mb-3">
                      <label htmlFor="oldPassword" className="form-label">Mot de passe</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="oldPassword"
                        onChange={(event) => handleChange(event, setPassword)} 
                        onKeyDown={(event)=>handleEnterKey(event,csrfToken, setErreurs, [ Password, NewPassword,CNewPassword], navigate,isErreur,setIsErreur)}
    
                      />
                      {erreurs.PasswordErreur && <small className="text-danger">{erreurs.PasswordErreur}</small>}
                    </div>
    
                    <div className="mb-3">
                      <label htmlFor="Newpassword" className="form-label">Nouveau mot de passe</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="Newpassword"
                        onChange={(event) => handleChange(event, setNewPassword)}
                        onKeyDown={(event)=>handleEnterKey(event,csrfToken, setErreurs, [ Password, NewPassword,CNewPassword], navigate,isErreur,setIsErreur)}
    
                      />
                      {erreurs.NewPasswordErreur && <small className="text-danger">{erreurs.NewPasswordErreur}</small>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="CNewPassword" className="form-label">Nouveau mot de passe</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="CNewPassword"
                        onChange={(event) => handleChange(event, setCNewPassword)}
                        onKeyDown={(event)=>handleEnterKey(event,csrfToken, setErreurs, [ Password, NewPassword,CNewPassword], navigate,isErreur,setIsErreur)}
    
                      />
                      {erreurs.CNewPasswordErreur && <small className="text-danger">{erreurs.CNewPasswordErreur}</small>}
                    </div>
    
                    <button 
                      type="button" 
                      className="btn btn-dark w-100 mt-3"
                      onClick={() => submit(csrfToken, setErreurs, [ Password, NewPassword,CNewPassword], navigate,isErreur,setIsErreur)}
                    >
                      Changer le mot de passe
                    </button>
                    {/* Bouton Annuler */}
                    <br />
                    <button 
                      type="button" 
                      className="btn w-100 mt-3 btn-danger"
                      onClick={() => navigate("/user")} // ou un navigate("/profil") par exemple
                    >
                      Annuler
                    </button>
                  </form>
                </div>
              </div>
            
          
          <br />
          </Fond>
          </>
        )
}

export function ChangePasswordButton(){
  const navigate=useNavigate()

  return(
    <button className="bg-black text-white px-5 py-2 rounded-2xl text-sm font-medium hover:bg-gray-900 transition" onClick={()=>navigate("/user/changePassword")}>Changer le mot de passe</button>
  )
}

//renvoie vrai s'il y a une erreur
function checkErreursSubmit(Password,NewPassword,CNewPassword,csrfToken,setErreurs,setIsErreur){
    
    if (Password.length>0 && NewPassword.length>0 && CNewPassword.length>0){
        checkErreurs(Password,NewPassword,CNewPassword,setErreurs,csrfToken,setIsErreur)
        checkPassword(Password,setErreurs,setIsErreur)
    }
    
    else{
        setErreurs(etatPrec=>({
            ...etatPrec,
            grosseErreur:"Veuillez remplir tous les champs",}
          ))
       setIsErreur(true)
    }
    
}
function checkErreurs(Password,NewPassword,CNewPassword,setErreurs,csrfToken,setIsErreur){
    
    if (Password==NewPassword   && Password.length>0 && NewPassword.length>0){
        setErreurs(etatPrec=>({
            ...etatPrec,
            NewPasswordErreur:"Votre nouveau mot de passe correspond à l'ancien",}
          ))
        setIsErreur(true)
        
    }
    else{
      setErreurs(etatPrec=>({
        ...etatPrec,
        NewPasswordErreur:"",}
      ))
    }

    
    if (NewPassword!=CNewPassword && CNewPassword.length>0 && NewPassword.length>0){
        setErreurs(etatPrec=>({
            ...etatPrec,
            CNewPasswordErreur:"Votre nouveau mot de passe ne correspond pas à sa confirmation",}
          ))
        setIsErreur(true)
        
    }
    else{
      setErreurs(etatPrec=>({
        ...etatPrec,
        CNewPasswordErreur:"",}
      ))
    }
    if (NewPassword.length>0){
      checkPassword(NewPassword,setErreurs,setIsErreur)
    }

}

function checkPassword(formPassword,setErreurs,setIsErreur){
    if (formPassword.length<10){
      setErreurs(etatPrec=>({
        ...etatPrec,
        NewPasswordErreur:"Veuillez rentrer au minimum 10 caractères"
      }))
    }
    else{
      
    if (contientPasMajetMin(formPassword) ){
      setErreurs(etatPrec=>({
        ...etatPrec,
        NewPasswordErreur:"Veuillez mettre des majuscules et des minuscules dans votre nouveau mot de passe",}
      ))
      setIsErreur(true)
    }
    else{
      if (!verifMotDePasse(formPassword)){
        setErreurs(etatPrec=>({
          ...etatPrec,
          NewPasswordErreur:"Veuillez mettre des symboles spéciaux (#,_,$,..) et des chiffres dans votre nouveau mot de passe",}
        ))
        setIsErreur(true)
      }
      else{
        setErreurs(etatPrec=>({
          ...etatPrec,
          NewPasswordErreur:"",}
        ))
      }
    }

    }


    

    
}

export default function ButtonChangePassword(){
    
}

function submit(csrfToken, setErreurs, champs, navigate,isErreur,setIsErreur){
  const [Password,NewPassword,CNewPassword]=champs
  checkErreursSubmit(Password,NewPassword,CNewPassword,csrfToken,setErreurs,setIsErreur)
  const request= async () =>{
    try {
        const response = await fetch("/api/security/changePassword", {
            method: "POST",
            headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
              "Content-Type": "application/json",
              'X-CSRF-Token': csrfToken,
            },
            credentials: 'include',
            body: JSON.stringify({oldPassword:Password,newPassword:NewPassword})
            
          });
        if (response.ok){
            const {isEqual} = await response.json()
            if (!isEqual){
                setErreurs(etatPrec=>({
                    ...etatPrec,
                    PasswordErreur:"Votre mot de passe est incorrect",}
                  ))
                  
            } else{
              navigate("/user")
            }

            
            return false;
        }
        else{
          setErreurs(etatPrec=>({
            ...etatPrec,
            PasswordErreur:"Votre mot de passe est incorrect",}
          ))
        }
        
        

        

    } catch (err){
        console.error("Erreur lors de la vérification du login :",err)
        return true

    }
}
  if (!isErreur){
    request()
  }
  setIsErreur(false)


  
 ;
}