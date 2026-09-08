import React, { useState } from 'react'
import { X, UploadCloud, FileText, CheckCircle2, AlertTriangle, Undo2, ArrowRight } from 'lucide-react'
import { importService } from '../../services/importService'

interface ImportWizardModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const SAMPLE_CSV = `name,destinationName,category,lat,lng,entryFeeIndian,entryFeeForeign,durationMin,importanceScore,description
Fateh Sagar Lake,Udaipur,lake,24.6033,73.6738,0,0,90,8.8,"Artificial lake bordered by hills and the Nehru Park island cafe."
Sukhadia Circle,Udaipur,heritage,24.6075,73.6934,0,0,45,7.8,"Illuminated three-tiered marble fountain and popular evening snack center."`

export const ImportWizardModal: React.FC<ImportWizardModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'batches'>('upload')
  const [fileType, setFileType] = useState<'csv' | 'json'>('csv')
  const [entityType, setEntityType] = useState<'attraction' | 'hotel' | 'restaurant'>('attraction')
  const [rawText, setRawText] = useState<string>(SAMPLE_CSV)
  const [fileName, setFileName] = useState<string>('udaipur_landmarks.csv')
  const [validationResult, setValidationResult] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  if (!isOpen) return null

  const batches = importService.getBatches()

  const handleValidate = () => {
    const result = importService.validateRawData(rawText, fileType, entityType)
    setValidationResult(result)
  }

  const handleApply = () => {
    if (!validationResult || !validationResult.isValid) return
    setIsProcessing(true)
    setTimeout(() => {
      importService.applyImportBatch(
        fileName,
        entityType,
        {
          validNew: validationResult.validNew,
          validUpdates: validationResult.validUpdates,
        },
        'Admin',
        'Admin'
      )
      setIsProcessing(false)
      onSuccess()
      onClose()
    }, 300)
  }

  const handleRollback = (batchId: string) => {
    if (confirm(`Confirm rollback of batch ${batchId}? This will remove all records created in this import.`)) {
      importService.rollbackBatch(batchId, 'Admin', 'Admin')
      onSuccess()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-xs">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1F2937]">
                Bulk Tourism Data Import & Batch Rollback Engine
              </h3>
              <p className="text-[#6B7280] mt-0.5">
                Validated schema ingestion with complete audit-trailed rollback capability.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#1F2937] hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center px-6 border-b border-[#E5E7EB] bg-white">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2.5 font-medium border-b-2 transition-colors ${
              activeTab === 'upload'
                ? 'border-[#C96F3B] text-[#C96F3B]'
                : 'border-transparent text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            1. Validate & Ingest
          </button>
          <button
            onClick={() => setActiveTab('batches')}
            className={`px-4 py-2.5 font-medium border-b-2 transition-colors ${
              activeTab === 'batches'
                ? 'border-[#C96F3B] text-[#C96F3B]'
                : 'border-transparent text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            2. Active Batches & Rollback ({batches.length})
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#F7F8FA]">
          {activeTab === 'upload' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Target Entity Type</label>
                  <select
                    value={entityType}
                    onChange={(e: any) => setEntityType(e.target.value)}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] focus:ring-1 focus:ring-[#C96F3B] outline-none"
                  >
                    <option value="attraction">Attractions / Heritage Sites</option>
                    <option value="hotel">Stays & Hotels</option>
                    <option value="restaurant">Restaurants & Food</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">File Format</label>
                  <select
                    value={fileType}
                    onChange={(e: any) => setFileType(e.target.value)}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] focus:ring-1 focus:ring-[#C96F3B] outline-none"
                  >
                    <option value="csv">CSV (Comma Separated)</option>
                    <option value="json">JSON Array</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">File Label / Batch Tag</label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] focus:ring-1 focus:ring-[#C96F3B] outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[#1F2937] font-medium">
                    Raw Data Payload (Paste CSV / JSON content)
                  </label>
                  <button
                    type="button"
                    onClick={() => setRawText(SAMPLE_CSV)}
                    className="text-[#C96F3B] hover:underline text-[11px] font-medium"
                  >
                    Load Sample CSV
                  </button>
                </div>
                <textarea
                  rows={6}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  className="w-full bg-white font-mono text-[11px] text-[#1F2937] border border-[#E5E7EB] rounded-xl p-3 focus:ring-1 focus:ring-[#C96F3B] focus:border-[#C96F3B] outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleValidate}
                  className="px-4 py-2 rounded-lg bg-[#C96F3B] hover:bg-[#B55F2D] text-white font-semibold shadow-sm transition-colors"
                >
                  Run Schema Pre-Validation
                </button>
              </div>

              {/* Validation Results Matrix */}
              {validationResult && (
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                    <div className="flex items-center gap-2">
                      {validationResult.isValid ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                      )}
                      <span className="font-bold text-[#1F2937]">
                        Validation Status: {validationResult.isValid ? 'READY FOR INGESTION' : 'ERRORS FOUND'}
                      </span>
                    </div>
                    <span className="font-mono text-[#6B7280]">
                      Total Rows: {validationResult.totalRows}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-3 text-center">
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                      <div className="text-base font-bold text-emerald-700">
                        {validationResult.validNew.length}
                      </div>
                      <div className="text-[10px] text-[#4B5563] font-medium">New Records</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200">
                      <div className="text-base font-bold text-blue-700">
                        {validationResult.validUpdates.length}
                      </div>
                      <div className="text-[10px] text-[#4B5563] font-medium">Matched Updates</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                      <div className="text-base font-bold text-amber-800">
                        {validationResult.duplicates.length}
                      </div>
                      <div className="text-[10px] text-[#4B5563] font-medium">Duplicates</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-red-50 border border-red-200">
                      <div className="text-base font-bold text-red-700">
                        {validationResult.invalid.length}
                      </div>
                      <div className="text-[10px] text-[#4B5563] font-medium">Invalid Rows</div>
                    </div>
                  </div>

                  {validationResult.invalid.length > 0 && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg space-y-1">
                      <span className="font-bold text-red-700">Validation Errors:</span>
                      {validationResult.invalid.map((err: any, idx: number) => (
                        <div key={idx} className="text-[#1F2937]">
                          Row {err.row}: {err.reason}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="space-y-3">
              <div className="text-[#1F2937] font-bold mb-2">Historical Ingestion Batches</div>
              {batches.map((batch) => (
                <div
                  key={batch.id}
                  className="p-4 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-between shadow-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#C96F3B]">{batch.id}</span>
                      <span className="text-[#1F2937] font-semibold">{batch.fileName}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          batch.status === 'applied'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-gray-100 text-[#4B5563]'
                        }`}
                      >
                        {batch.status}
                      </span>
                    </div>
                    <div className="text-[#6B7280] text-[11px]">
                      Imported {batch.insertedCount} records &bull; {new Date(batch.timestamp).toLocaleString()}
                    </div>
                  </div>

                  {batch.status === 'applied' && (
                    <button
                      onClick={() => handleRollback(batch.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 hover:bg-red-100 text-red-700 font-semibold transition-colors"
                    >
                      <Undo2 className="w-3.5 h-3.5" />
                      <span>Rollback Batch</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {activeTab === 'upload' && (
          <div className="px-6 py-3.5 border-t border-[#E5E7EB] bg-white flex items-center justify-between">
            <span className="text-[#6B7280]">
              * Data is saved initially as Draft and queued for verification.
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-[#6B7280] hover:text-[#1F2937]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!validationResult || !validationResult.isValid || isProcessing}
                onClick={handleApply}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold shadow-sm transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Commit Import Batch</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
