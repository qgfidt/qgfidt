// 主应用逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 导航切换
    const nfcBtn = document.getElementById('nfcBtn');
    const contentBtn = document.getElementById('contentBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const nfcSection = document.getElementById('nfcSection');
    const contentSection = document.getElementById('contentSection');
    const settingsSection = document.getElementById('settingsSection');
    
    // 默认显示NFC部分
    showSection('nfc');
    
    nfcBtn.addEventListener('click', () => showSection('nfc'));
    contentBtn.addEventListener('click', () => showSection('content'));
    settingsBtn.addEventListener('click', () => showSection('settings'));
    
    function showSection(section) {
        nfcSection.classList.add('hidden');
        contentSection.classList.add('hidden');
        settingsSection.classList.add('hidden');
        
        nfcBtn.classList.remove('bg-pink-700');
        nfcBtn.classList.add('bg-pink-500');
        contentBtn.classList.remove('bg-pink-700');
        contentBtn.classList.add('bg-pink-500');
        settingsBtn.classList.remove('bg-pink-700');
        settingsBtn.classList.add('bg-pink-500');
        
        switch(section) {
            case 'nfc':
                nfcSection.classList.remove('hidden');
                nfcBtn.classList.remove('bg-pink-500');
                nfcBtn.classList.add('bg-pink-700');
                break;
            case 'content':
                contentSection.classList.remove('hidden');
                contentBtn.classList.remove('bg-pink-500');
                contentBtn.classList.add('bg-pink-700');
                break;
            case 'settings':
                settingsSection.classList.remove('hidden');
                settingsBtn.classList.remove('bg-pink-500');
                settingsBtn.classList.add('bg-pink-700');
                break;
        }
    }
    
    // NFC功能
    const scanNfcBtn = document.getElementById('scanNfcBtn');
    const nfcModal = document.getElementById('nfcModal');
    const cancelNfcScan = document.getElementById('cancelNfcScan');
    const nfcResult = document.getElementById('nfcResult');
    const nfcId = document.getElementById('nfcId');
    
    scanNfcBtn.addEventListener('click', startNfcScan);
    cancelNfcScan.addEventListener('click', stopNfcScan);
    
    function startNfcScan() {
        nfcModal.classList.remove('hidden');
        
        // 模拟NFC扫描
        setTimeout(() => {
            if (Math.random() > 0.3) { // 70%成功率模拟
                const randomId = 'NFC-' + Math.random().toString(36).substr(2, 8).toUpperCase();
                nfcId.textContent = randomId;
                nfcResult.classList.remove('hidden');
                
                // 添加到日志
                addLogEntry('NFC标签扫描', `成功扫描NFC标签: ${randomId}`, 'success');
            } else {
                addLogEntry('NFC标签扫描', '扫描失败，请重试', 'error');
            }
            
            nfcModal.classList.add('hidden');
        }, 2000);
    }
    
    function stopNfcScan() {
        nfcModal.classList.add('hidden');
        addLogEntry('NFC标签扫描', '用户取消了NFC扫描', 'info');
    }
    
    // 内容类型切换
    const contentType = document.getElementById('contentType');
    const textInput = document.getElementById('textInput');
    const fileInput = document.getElementById('fileInput');
    
    contentType.addEventListener('change', function() {
        if (this.value === 'text') {
            textInput.classList.remove('hidden');
            fileInput.classList.add('hidden');
        } else {
            textInput.classList.add('hidden');
            fileInput.classList.remove('hidden');
        }
    });
    
    // 绑定NFC功能
    const bindNfcBtn = document.getElementById('bindNfcBtn');
    const actionType = document.getElementById('actionType');
    
    bindNfcBtn.addEventListener('click', function() {
        if (!nfcId.textContent) {
            alert('请先扫描NFC标签');
            return;
        }
        
        const action = actionType.value;
        let actionText = '';
        
        switch(action) {
            case 'message':
                actionText = '发送消息功能';
                break;
            case 'content':
                actionText = '展示内容功能';
                break;
            case 'reminder':
                actionText = '纪念日提醒功能';
                break;
        }
        
        addLogEntry('NFC功能绑定', `已将${actionText}绑定到NFC标签: ${nfcId.textContent}`, 'success');
        alert(`成功将${actionText}绑定到NFC标签!`);
    });
    
    // 上传内容
    const uploadContentBtn = document.getElementById('uploadContentBtn');
    
    uploadContentBtn.addEventListener('click', function() {
        const type = contentType.value;
        let content = '';
        
        if (type === 'text') {
            content = document.querySelector('#textInput textarea').value;
            if (!content) {
                alert('请输入内容');
                return;
            }
        } else {
            const file = document.querySelector('#fileInput input').files[0];
            if (!file) {
                alert('请选择文件');
                return;
            }
            content = file.name;
        }
        
        addLogEntry('内容上传', `上传了新的${type}内容: ${content}`, 'success');
        alert('内容上传成功!');
        
        // 清空表单
        if (type === 'text') {
            document.querySelector('#textInput textarea').value = '';
        } else {
            document.querySelector('#fileInput input').value = '';
        }
        
        // 模拟添加到内容列表
        addContentToList(type, content);
    });
    
    // 添加内容到列表
    function addContentToList(type, content) {
        const contentList = document.getElementById('contentList');
        const icon = getContentIcon(type);
        const now = new Date().toLocaleString();
        
        const card = document.createElement('div');
        card.className = 'content-card flex items-center';
        card.innerHTML = `
            <div class="text-pink-600 text-2xl mr-3">${icon}</div>
            <div class="flex-1">
                <h4 class="font-medium">${content}</h4>
                <p class="text-sm text-gray-500">${type} · ${now}</p>
            </div>
            <button class="text-gray-400 hover:text-pink-600">
                <i class="fas fa-ellipsis-v"></i>
            </button>
        `;
        
        contentList.prepend(card);
    }
    
    function getContentIcon(type) {
        switch(type) {
            case 'text': return '<i class="fas fa-file-alt"></i>';
            case 'image': return '<i class="fas fa-image"></i>';
            case 'audio': return '<i class="fas fa-music"></i>';
            case 'video': return '<i class="fas fa-video"></i>';
            default: return '<i class="fas fa-file"></i>';
        }
    }
    
    // 添加日志条目
    function addLogEntry(title, message, type) {
        const logContainer = document.getElementById('interactionLog');
        const now = new Date().toLocaleTimeString();
        
        let icon = '';
        let color = '';
        
        switch(type) {
            case 'success':
                icon = 'fa-check-circle';
                color = 'text-green-500';
                break;
            case 'error':
                icon = 'fa-times-circle';
                color = 'text-red-500';
                break;
            case 'info':
                icon = 'fa-info-circle';
                color = 'text-blue-500';
                break;
            default:
                icon = 'fa-circle';
                color = 'text-gray-500';
        }
        
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <i class="fas ${icon} ${color} mr-2"></i>
                    <span class="font-medium">${title}</span>
                </div>
                <span class="time">${now}</span>
            </div>
            <p class="mt-1 ml-6 text-gray-700">${message}</p>
        `;
        
        logContainer.prepend(entry);
        
        // 限制日志数量
        if (logContainer.children.length > 10) {
            logContainer.removeChild(logContainer.lastChild);
        }
    }
    
    // 初始化示例数据
    function initSampleData() {
        addLogEntry('系统启动', '情侣NFC互动系统已就绪', 'info');
        addContentToList('text', '我们的第一次约会');
        addContentToList('image', '海边合影.jpg');
        addContentToList('audio', '为你录制的告白.mp3');
    }
    
    initSampleData();
    
    // 检查Web NFC API支持
    function checkNfcSupport() {
        if ('NDEFReader' in window) {
            addLogEntry('NFC支持', '您的设备支持Web NFC API', 'success');
        } else {
            addLogEntry('NFC支持', '您的设备不支持Web NFC API或未启用', 'error');
        }
    }
    
    checkNfcSupport();
    
    // 实际Web NFC API实现 (需要HTTPS环境)
    if ('NDEFReader' in window) {
        const nfcReader = new NDEFReader();
        
        scanNfcBtn.addEventListener('click', async () => {
            try {
                await nfcReader.scan();
                nfcModal.classList.remove('hidden');
                
                nfcReader.onreading = event => {
                    const serialNumber = event.serialNumber;
                    nfcId.textContent = serialNumber;
                    nfcResult.classList.remove('hidden');
                    nfcModal.classList.add('hidden');
                    
                    addLogEntry('NFC标签扫描', `成功扫描NFC标签: ${serialNumber}`, 'success');
                    
                    // 处理NFC标签内容
                    for (const record of event.message.records) {
                        console.log('Record type: ', record.recordType);
                        console.log('Media type: ', record.mediaType);
                        console.log('Data: ', record.data);
                    }
                };
                
                nfcReader.onreadingerror = () => {
                    addLogEntry('NFC标签扫描', '扫描NFC标签时出错', 'error');
                    nfcModal.classList.add('hidden');
                };
            } catch (error) {
                console.error('NFC扫描错误:', error);
                addLogEntry('NFC标签扫描', `扫描错误: ${error.message}`, 'error');
                nfcModal.classList.add('hidden');
            }
        });
        
        cancelNfcScan.addEventListener('click', () => {
            nfcReader.onreading = null;
            nfcReader.onreadingerror = null;
            nfcModal.classList.add('hidden');
            addLogEntry('NFC标签扫描', '用户取消了NFC扫描', 'info');
        });
        
        // NFC写入功能
        bindNfcBtn.addEventListener('click', async function() {
            if (!nfcId.textContent) {
                alert('请先扫描NFC标签');
                return;
            }
            
            const action = actionType.value;
            let message = '';
            
            switch(action) {
                case 'message':
                    message = 'message:' + document.querySelector('#messageOptions select').value;
                    break;
                case 'content':
                    message = 'content:show_latest';
                    break;
                case 'reminder':
                    message = 'reminder:anniversary';
                    break;
            }
            
            try {
                await nfcReader.write(message);
                addLogEntry('NFC写入', `成功将消息写入NFC标签: ${message}`, 'success');
                alert('NFC标签写入成功!');
            } catch (error) {
                console.error('NFC写入错误:', error);
                addLogEntry('NFC写入', `写入NFC标签失败: ${error.message}`, 'error');
                alert('NFC标签写入失败，请重试');
            }
        });
    }
});
