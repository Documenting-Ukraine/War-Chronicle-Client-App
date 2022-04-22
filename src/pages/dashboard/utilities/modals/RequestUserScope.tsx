import PopUpBg from "../../../utilityComponents/popUpBg/PopUpBg";
import { GeneralDashboardPopUp } from "./general";
import RequestAccessInput from "../../../forms/requestAccessForm/RequestAccessInput";
import { CategoriesList } from "../../../../types/dataTypes/CategoryIconMap";
// import { Option } from "../../../forms/data/OccupationList";
const RequestNewScopesModal = () => {
    const onRequestAccess = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) =>{
        e.preventDefault()
        const data = e.currentTarget.dataset
        const actionType = data.actionType
        switch(actionType){
            case "request-access":
                break;
            case "close-pop-up":
                break;
            
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
    return (
        <PopUpBg fullViewport={true} onClick={onRequestAccess}>
            <form>
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
