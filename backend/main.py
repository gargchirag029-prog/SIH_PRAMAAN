from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import uuid
from datetime import datetime

try:
    from backend.models import (
        ApplicationCreate,
        ScrutinyRemarkRequest,
        DiscrepancyRequest,
        DiscrepancyResponseRequest,
        EVCScheduleRequest,
        EVCReportSubmission,
        CommitteeDecisionRequest,
        DocumentUploadRequest,
    )
except ImportError:
    from models import (
        ApplicationCreate,
        ScrutinyRemarkRequest,
        DiscrepancyRequest,
        DiscrepancyResponseRequest,
        EVCScheduleRequest,
        EVCReportSubmission,
        CommitteeDecisionRequest,
        DocumentUploadRequest,
    )

app = FastAPI(
    title="PARIKALP API — AICTE Approval Workflow Automation & Continuous Compliance",
    description="Smart India Hackathon 2026 | Problem Statement 26265 | Team PARIKALP (Team ID: 199059)",
    version="2.6.0",
)

# Enable CORS for local Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- SEED DATABASE IN MEMORY -----------------
applications_db = [
    {
        "id": "app-001",
        "referenceNumber": "AICTE/NWRO/2026/APP-8492",
        "institutionId": "inst-diat-01",
        "institutionName": "Delhi Institute of Advanced Technology",
        "institutionType": "Government",
        "aictePermanentId": "1-42981001",
        "region": "North-Western",
        "state": "Delhi",
        "category": "Extension of Approval (EOA)",
        "academicYear": "2026-2027",
        "submissionDate": "2026-10-24 14:32",
        "lastUpdated": "2026-10-30 16:15",
        "status": "UNDER_SCRUTINY",
        "currentStage": "SCRUTINY",
        "assignedOfficerName": "Dr. R. K. Soni",
        "documentCompletenessScore": 92,
        "discrepancyCount": 1,
        "discrepancies": [
            "Fire & Life Safety Certificate issue date is dated 2023 with 1-year validity; renewed NOC for 2026-2027 is pending."
        ],
        "evcRequired": True,
    },
    {
        "id": "app-002",
        "referenceNumber": "AICTE/SRO/2026/APP-7821",
        "institutionName": "Chennai Academy of Technology",
        "region": "Southern",
        "category": "Increase in Intake (III)",
        "status": "EVC_SCHEDULED",
        "currentStage": "EVC",
        "documentCompletenessScore": 100,
        "discrepancyCount": 0,
        "evcRequired": True,
    },
    {
        "id": "app-003",
        "referenceNumber": "AICTE/WRO/2026/APP-9104",
        "institutionName": "Pune Institute of Computer Science",
        "region": "Western",
        "category": "Introduction of New Course/Program",
        "status": "COMMITTEE_REVIEW",
        "currentStage": "COMMITTEE",
        "documentCompletenessScore": 100,
        "discrepancyCount": 0,
        "evcRequired": True,
    },
]

audit_logs_db = []

def record_audit(action: str, remarks: str, app_ref: Optional[str] = None):
    audit_logs_db.append({
        "id": f"aud-{uuid.uuid4().hex[:8]}",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "action": action,
        "remarks": remarks,
        "applicationRef": app_ref,
        "ipAddress": "164.100.158.42 (NIC-AICTE Gateway)",
        "integrityHash": uuid.uuid4().hex,
    })

# ----------------- ENDPOINTS -----------------

@app.get("/")
def root():
    return {
        "service": "PARIKALP AICTE Approval Workflow & Compliance API",
        "version": "2.6.0",
        "status": "HEALTHY",
        "sih2026": {
            "problemId": "26265",
            "team": "PARIKALP",
            "teamId": "199059",
            "theme": "Smart Automation",
        },
    }

@app.get("/api/applications")
def get_applications():
    return applications_db

@app.get("/api/applications/{app_id}")
def get_application(app_id: str):
    for app in applications_db:
        if app["id"] == app_id or app["referenceNumber"] == app_id:
            return app
    raise HTTPException(status_code=404, detail="Application not found")

@app.post("/api/applications", status_code=status.HTTP_201_CREATED)
def create_application(payload: ApplicationCreate):
    random_id = uuid.uuid4().hex[:4].upper()
    ref = f"AICTE/NWRO/2026/APP-{random_id}"
    new_app = {
        "id": f"app-{uuid.uuid4().hex[:6]}",
        "referenceNumber": ref,
        "institutionId": f"inst-{uuid.uuid4().hex[:6]}",
        "institutionName": payload.institutionName,
        "institutionType": payload.institutionType,
        "aictePermanentId": payload.aictePermanentId,
        "region": payload.region,
        "state": payload.state,
        "category": payload.category,
        "academicYear": payload.academicYear,
        "submissionDate": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "lastUpdated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "status": "SUBMITTED",
        "currentStage": "SCRUTINY",
        "assignedOfficerName": "Dr. R. K. Soni",
        "documentCompletenessScore": 100,
        "discrepancyCount": 0,
        "evcRequired": payload.category != "Extension of Approval (EOA)",
        "courses": [c.dict() for c in payload.courses],
    }
    applications_db.insert(0, new_app)
    record_audit("APPLICATION_SUBMISSION", f"New application submitted by {payload.institutionName}", ref)
    return new_app

@app.post("/api/scrutiny/{app_id}/discrepancy")
def raise_discrepancy(app_id: str, payload: DiscrepancyRequest):
    for app in applications_db:
        if app["id"] == app_id or app["referenceNumber"] == app_id:
            app["status"] = "DISCREPANCY_RAISED"
            app["currentStage"] = "SCRUTINY"
            app["scrutinyRemarks"] = payload.discrepancyNote
            discs = app.get("discrepancies", [])
            discs.append(payload.discrepancyNote)
            app["discrepancies"] = discs
            app["discrepancyCount"] = len(discs)
            record_audit("DISCREPANCY_RAISED", payload.discrepancyNote, app["referenceNumber"])
            return {"status": "SUCCESS", "application": app}
    raise HTTPException(status_code=404, detail="Application not found")

@app.post("/api/scrutiny/{app_id}/respond")
def respond_discrepancy(app_id: str, payload: DiscrepancyResponseRequest):
    for app in applications_db:
        if app["id"] == app_id or app["referenceNumber"] == app_id:
            app["status"] = "RE_SCRUTINY_PENDING"
            app["currentStage"] = "RE_SCRUTINY"
            record_audit("DISCREPANCY_RESOLVED", payload.responseNote, app["referenceNumber"])
            return {"status": "SUCCESS", "application": app}
    raise HTTPException(status_code=404, detail="Application not found")

@app.post("/api/committee/decision")
def record_committee_decision(payload: CommitteeDecisionRequest):
    order_num = f"F.No. AICTE/AB/2026/LOA-{uuid.uuid4().hex[:8].upper()}" if payload.decision == "APPROVED" else None
    record_audit("FINAL_DECISION_RECORDED", f"SAC recorded decision {payload.decision}. Order: {order_num}")
    return {
        "status": "SUCCESS",
        "decision": payload.decision,
        "approvalLetterNumber": order_num,
        "validThrough": "2026-2027",
    }

@app.get("/api/audit-logs")
def get_audit_logs():
    return audit_logs_db

