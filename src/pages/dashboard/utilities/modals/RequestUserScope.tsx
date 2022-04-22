import PopUpBg from "../../../utilityComponents/popUpBg/PopUpBg";
import { GeneralDashboardPopUp, PopUpProps } from "./general";
import RequestAccessInput from "../../../forms/requestAccessForm/RequestAccessInput";
import { CategoriesList } from "../../../../types/dataTypes/CategoryIconMap";
import { useRealmApp } from "../../../../realm/RealmApp";
import { isUserCustomData } from "../../../../types/dataTypes";

const RequestNewScopesModal = ({closePopUp}:Omit<PopUpProps, "user" | "index">) => {
    const app = useRealmApp();
    const userData = {...app.currentUser?.customData}
    const onRequestAccess = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) =>{
        const data = e.currentTarget.dataset
        const actionType = data.actionType
        switch(actionType){
            case "close-pop-up":
                if (e.target === e.currentTarget) closePopUp(false);
                if (
                  (e.target instanceof HTMLElement || e.target instanceof SVGElement) &&
                  e.target.closest("button")?.dataset.actionType === "close-pop-up"
                )
                  closePopUp(false);
                break;
            case "request-access":
                break;
            default:
                return
        }
    }
    const alertContent =
    <>
        <p>To request access to a new category, you must submit the form below. You can only submit requests for one category at a time.</p>
        <p>After submitting, please wait for admin approval. Once an admin has approved your request, you will be able to add records to the new category.</p>
    </>
    const categoriesListOptions = CategoriesList.map((category) =>{
        return({
            value: category, 
            label: category
        })   
    })
    const onRequestAccessSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const fieldValues = Object.fromEntries(formData.entries());
        const purpose = fieldValues["Why do you want to access this category?"]
        const category = fieldValues["Select Category Scope"]

        if(!isUserCustomData(userData)) return
        const payload = {
            user_id: userData._id.toString(),
            first_name: userData.first_name,
            last_name: userData.last_name,
            purpose: purpose,
            category: category
        };

        closePopUp(false);
    }
    return (
        <PopUpBg fullViewport={true} onClick={onRequestAccess}>
            <form onSubmit={onRequestAccessSubmit}>
                <GeneralDashboardPopUp
                    onClick={onRequestAccess}
                    overallClassName={"request-new-scope-pop-up"}
                    heading={`Request New Scope`}
                    btnActionType="request-access"
                    btnText="Submit"
                    btnClass="request-scope-btn"
                    alertClass="request-scope-alert"
                    alertContent={alertContent}
                    index = {0}
                >
                    <>
                        <div className="top-spacing"></div>
                        <RequestAccessInput 
                            name = "Select Category Scope"
                            dropDown={categoriesListOptions}
                        />
                        <RequestAccessInput 
                            name="Why do you want to access this category?"
                            textArea={true}
                            required={false}
                        />
                    </>
                </GeneralDashboardPopUp>
            </form>
        </PopUpBg>
    )
};
export default RequestNewScopesModal;
