from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime

class ContactPerson(BaseModel):
    name: str
    designation: str
    phone: str
    email: str

class CourseDetail(BaseModel):
    id: str
    name: str
    program: str
    level: str
    currentIntake: int
    proposedIntake: int
    nbaAccredited: bool

class ApplicationCreate(BaseModel):
    institutionName: str
    institutionType: str
    aictePermanentId: str
    region: str
    state: str
    category: str
    academicYear: str = "2026-2027"
    contactPerson: ContactPerson
    landAreaAcres: float
    builtUpAreaSqMeters: float
    totalFacultyCount: int
    studentFacultyRatio: str
    courses: List[CourseDetail]

class ScrutinyRemarkRequest(BaseModel):
    remarks: str
    forwardTo: Optional[str] = None # EVC or COMMITTEE

class DiscrepancyRequest(BaseModel):
    discrepancyNote: str
    targetCategory: str
    deadlineDays: int = 7

class DiscrepancyResponseRequest(BaseModel):
    responseNote: str

class EVCCommitteeMember(BaseModel):
    name: str
    role: str
    institution: str
    phone: str
    email: str

class EVCScheduleRequest(BaseModel):
    applicationId: str
    visitDate: str
    visitTime: str
    locationAddress: str
    committeeMembers: List[EVCCommitteeMember]
    schedulingRemarks: Optional[str] = None

class EVCReportSubmission(BaseModel):
    visitId: str
    submittedBy: str
    overallScore: int
    recommendation: str
    summary: str
    geotaggedCount: int
    videoVerified: bool

class CommitteeDecisionRequest(BaseModel):
    reviewId: str
    decision: str # APPROVED, REJECTED, RETURNED_FOR_CLARIFICATION
    remarks: str
    conditions: List[str] = []

class DocumentUploadRequest(BaseModel):
    applicationId: str
    category: str
    fileName: str
    fileSize: str
    issueDate: str
    expiryDate: Optional[str] = None

