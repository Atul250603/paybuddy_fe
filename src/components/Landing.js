import { useNavigate } from "react-router-dom";
import '../App.css';
function Landing() {
    const navigate=useNavigate();
    return (
        <div className="fw-normal w-100">
            <div className="position-relative d-flex justify-content-center align-items-center" style={{backgroundColor: "#EFF6FF", minHeight: "50vh"}}>
                <div className="p-2">
                    <div className="fw-bold fs-1 text-center my-3">Never Forget Who Owes You <span className="text-primary">Money</span></div>
                    <div className="d-flex justify-content-center text-secondary fs-5 my-3">
                        <div className="w-75 text-center">
                            PayBuddy helps you keep track of your transactions, debts. Stay on top of your finances with ease.
                        </div>
                    </div>
                    <div className="d-flex justify-content-center my-3">
                        <div className="btn btn-primary" onClick={()=>navigate('/login')}>Get Started</div>
                    </div>
                </div>
                
            </div>
            <div className="d-flex flex-column" style={{minHeight:"40vh"}}>
                <div className="fw-bold fs-1 text-center mt-4">Key Features</div>
                <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                    <div className="grid row col-12 justify-content-center gap-4 p-4">
                        <div className="text-center .col-xs-12 ga col-sm-5">
                            <div className="d-flex justify-content-center">
                                <div style={{ width: "50px", height: "50px" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0d6efd" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <div className="fw-bolder fs-4 mt-1">Split Expenses</div>
                                <div className="fs-5 text-secondary my-1">Easily split bills and expenses among friends and family.</div>
                            </div>
                        </div>
                        <div className="text-center .col-xs-12 ga col-sm-5">
                            <div className="d-flex justify-content-center">
                                <div style={{ width: "50px", height: "50px" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0d6efd" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <div className="fw-bolder fs-4 mt-1">Debt Tracking</div>
                                <div className="fs-5 text-secondary my-1">Keep track of who owes you money and who you owe.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column" style={{backgroundColor: "#EFF6FF",minHeight:"40vh" }}>
                <div className="fw-bold fs-1 text-center mt-4">How It Works</div>
                <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                    <div className="grid row col-12 justify-content-center gap-4 p-4">
                        <div className="text-center col-xs-12 col-sm-3 ">
                            <div className="d-flex justify-content-center">
                                <div className="bg-primary rounded-circle p-2 px-3 text-white fw-bold" style={{ width: "max-content" }}>1</div>
                            </div>
                            <div className="fw-bolder fs-4 mt-1">Add a Transaction</div>
                            <div className="fs-5 text-secondary my-1">
                                Enter the details of your financial interaction.
                            </div>
                        </div>
                        <div className="text-center col-xs-12 col-sm-3 ">
                            <div className="d-flex justify-content-center">
                                <div className="bg-primary rounded-circle p-2 px-3 text-white fw-bold" style={{ width: "max-content" }}>2</div>
                            </div>
                            <div className="fw-bolder fs-4 mt-1">Assign Participant</div>
                            <div className="fs-5 text-secondary my-1">
                                Select who's involved in the transaction.
                            </div>
                        </div>
                        <div className="text-center col-xs-12 col-sm-3 ">
                            <div className="d-flex justify-content-center">
                                <div className="bg-primary rounded-circle p-2 px-3 text-white fw-bold" style={{ width: "max-content" }}>3</div>
                            </div>
                            <div className="fw-bolder fs-4 mt-1">Track and Settle</div>
                            <div className="fs-5 text-secondary my-1">
                                Monitor balances and settle debts with ease.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;