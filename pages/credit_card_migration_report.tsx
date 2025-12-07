import React, { useState } from 'react';
import { Calendar, TrendingUp, AlertTriangle, CheckCircle, Users, FileText, DollarSign } from 'lucide-react';

export default function ProjectReport() {
  const [reportData, setReportData] = useState({
    projectName: '信用卡系統轉置專案',
    reportMonth: '2024年11月',
    reportDate: '2024-11-21',
    projectManager: '',
    overallStatus: 'on-track',
    
    // 執行摘要
    executiveSummary: '',
    
    // 專案進度
    progressOverall: 65,
    milestones: [
      { name: '需求分析與規劃', status: 'completed', completion: 100 },
      { name: '系統設計與架構', status: 'completed', completion: 100 },
      { name: '資料遷移準備', status: 'in-progress', completion: 75 },
      { name: '系統開發與整合', status: 'in-progress', completion: 60 },
      { name: '測試與驗證', status: 'pending', completion: 20 },
      { name: '上線準備與執行', status: 'pending', completion: 0 }
    ],
    
    // 本月完成事項
    completedItems: [
      '完成資料庫架構設計與審查',
      '建立測試環境並完成基礎配置',
      '完成第一階段資料清理作業'
    ],
    
    // 下月計畫
    nextMonthPlans: [
      '執行資料遷移測試（測試環境）',
      '完成核心交易模組開發',
      '進行系統整合測試（SIT）第一輪'
    ],
    
    // 風險與議題
    risks: [
      { 
        description: '舊系統資料品質問題影響遷移時程',
        impact: 'high',
        probability: 'medium',
        mitigation: '增派資料分析人員，建立資料清理SOP'
      }
    ],
    
    issues: [
      {
        description: '第三方支付介面API文件不完整',
        status: 'open',
        owner: '技術團隊',
        action: '已發函要求廠商提供完整文件'
      }
    ],
    
    // 資源狀況
    teamMembers: 12,
    budgetUsed: 3500000,
    budgetTotal: 6000000,
    
    // KPI
    kpis: [
      { name: '專案進度達成率', target: 70, actual: 65, unit: '%' },
      { name: '預算執行率', target: 60, actual: 58, unit: '%' },
      { name: '重大風險數量', target: 2, actual: 1, unit: '件' },
      { name: '團隊滿意度', target: 80, actual: 85, unit: '分' }
    ]
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return '已完成';
      case 'in-progress': return '進行中';
      case 'pending': return '待開始';
      case 'delayed': return '延遲';
      default: return status;
    }
  };

  const getRiskColor = (level) => {
    switch(level) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white">
      <style>{`
        @media print {
          .no-print { display: none; }
          .page-break { page-break-before: always; }
        }
      `}</style>

      {/* 標題區 */}
      <div className="border-b-4 border-blue-600 pb-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{reportData.projectName}</h1>
        <div className="flex justify-between items-center text-gray-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {reportData.reportMonth} 專案月報
            </span>
          </div>
          <span>報告日期: {reportData.reportDate}</span>
        </div>
      </div>

      {/* 專案狀態總覽 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          專案狀態總覽
        </h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-gray-600 text-sm mb-1">整體進度</div>
            <div className="text-2xl font-bold text-blue-600">{reportData.progressOverall}%</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-gray-600 text-sm mb-1">團隊人數</div>
            <div className="text-2xl font-bold text-green-600">{reportData.teamMembers}人</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-gray-600 text-sm mb-1">預算執行</div>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((reportData.budgetUsed / reportData.budgetTotal) * 100)}%
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-gray-600 text-sm mb-1">專案狀態</div>
            <div className="text-lg font-bold text-green-600">正常進行</div>
          </div>
        </div>
      </div>

      {/* 執行摘要 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">執行摘要</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <textarea
            className="w-full p-3 border rounded min-h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="請輸入本月專案執行摘要，包含主要成果、重點進展及整體評估..."
            value={reportData.executiveSummary}
            onChange={(e) => setReportData({...reportData, executiveSummary: e.target.value})}
          />
        </div>
      </div>

      {/* 里程碑進度 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">里程碑進度</h2>
        <div className="space-y-3">
          {reportData.milestones.map((milestone, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-800">{milestone.name}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                    {getStatusText(milestone.status)}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-600">{milestone.completion}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${milestone.completion}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 本月完成事項 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-600" />
          本月完成事項
        </h2>
        <ul className="space-y-2">
          {reportData.completedItems.map((item, index) => (
            <li key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 下月工作計畫 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-600" />
          下月工作計畫
        </h2>
        <ul className="space-y-2">
          {reportData.nextMonthPlans.map((plan, index) => (
            <li key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {index + 1}
              </div>
              <span className="text-gray-700">{plan}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 風險與議題 */}
      <div className="mb-8 page-break">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-yellow-600" />
          風險與議題管理
        </h2>
        
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">主要風險</h3>
          {reportData.risks.map((risk, index) => (
            <div key={index} className="border border-yellow-200 bg-yellow-50 rounded-lg p-4 mb-3">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-gray-800">{risk.description}</span>
                <div className="flex gap-2">
                  <span className={`text-xs font-medium ${getRiskColor(risk.impact)}`}>
                    影響: {risk.impact === 'high' ? '高' : risk.impact === 'medium' ? '中' : '低'}
                  </span>
                  <span className={`text-xs font-medium ${getRiskColor(risk.probability)}`}>
                    機率: {risk.probability === 'high' ? '高' : risk.probability === 'medium' ? '中' : '低'}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <strong>因應措施:</strong> {risk.mitigation}
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-3">待解決議題</h3>
          {reportData.issues.map((issue, index) => (
            <div key={index} className="border rounded-lg p-4 mb-3">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-gray-800">{issue.description}</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  {issue.status === 'open' ? '處理中' : '已結案'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div><strong>負責人:</strong> {issue.owner}</div>
                <div><strong>行動方案:</strong> {issue.action}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KPI追蹤 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">關鍵績效指標 (KPI)</h2>
        <div className="grid grid-cols-2 gap-4">
          {reportData.kpis.map((kpi, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="text-gray-600 text-sm mb-2">{kpi.name}</div>
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-2xl font-bold text-gray-800">{kpi.actual}</span>
                  <span className="text-gray-500 ml-1">{kpi.unit}</span>
                </div>
                <div className="text-sm text-gray-500">目標: {kpi.target}{kpi.unit}</div>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${kpi.actual >= kpi.target ? 'bg-green-600' : 'bg-yellow-600'}`}
                  style={{ width: `${Math.min((kpi.actual / kpi.target) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 預算執行狀況 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-green-600" />
          預算執行狀況
        </h2>
        <div className="border rounded-lg p-6">
          <div className="grid grid-cols-3 gap-6 mb-4">
            <div>
              <div className="text-gray-600 text-sm mb-1">總預算</div>
              <div className="text-xl font-bold text-gray-800">
                NT$ {reportData.budgetTotal.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-gray-600 text-sm mb-1">已使用</div>
              <div className="text-xl font-bold text-blue-600">
                NT$ {reportData.budgetUsed.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-gray-600 text-sm mb-1">剩餘預算</div>
              <div className="text-xl font-bold text-green-600">
                NT$ {(reportData.budgetTotal - reportData.budgetUsed).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
              style={{ width: `${(reportData.budgetUsed / reportData.budgetTotal) * 100}%` }}
            />
          </div>
          <div className="text-right text-sm text-gray-600 mt-2">
            執行率: {Math.round((reportData.budgetUsed / reportData.budgetTotal) * 100)}%
          </div>
        </div>
      </div>

      {/* 操作按鈕 */}
      <div className="flex gap-4 mt-8 no-print">
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          列印 / 匯出 PDF
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          重置範本
        </button>
      </div>

      {/* 頁尾 */}
      <div className="mt-12 pt-6 border-t text-center text-sm text-gray-500">
        <p>本報告由專案經理製作 | 機密文件，僅供內部使用</p>
      </div>
    </div>
  );
}