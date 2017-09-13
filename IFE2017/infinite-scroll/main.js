
const $ = id => {
	return document.getElementById(id);
}

const addItem = (content, itemContent) => {
	let item = document.createElement('div');
	item.className = 'item';

	let p = document.createElement('p');
	p.innerHTML = itemContent;
	item.appendChild(p);
	content.appendChild(item);
}

let content = $('content');

let pageSize = 10;
	count = 0;

for (let i = 0; i < count + pageSize; i++) {
	addItem(content, 'item' + i)
}

count += pageSize;

const createLoadingElement = _ => {
	let loadNode = document.createElement('p');
	loadNode.innerText = 'Loading...';
	return loadNode
}



const loadMore = (container, loadElment, onLoad) => {
	let isLoading = false;

	const finish = _ => {
		if (isLoading) {
			container.removeChild(loadElment);
			isLoading = false;
		}
	};

	container.onscroll = _ => {
		// 自身高度 + 滚动条距离顶部的高度 >= 内容实际高度
		// 是否滚动到底部
		if (container.offsetHeight + container.scrollTop >= container.scrollHeight) {

			if (!isLoading) {
				container.appendChild(loadElment);

				// 将容器滚动至底部 
				container.scrollTop = container.scrollHeight - container.offsetHeight;

				isLoading = true;

				onLoad(finish)
			}
		}
	}
}

loadMore(content, createLoadingElement(), finish => {

	// 模拟加载延时
	setTimeout( _ => {

	    // 当加载完成时必须执行finish函数取消loading状态
	    finish();

	    for(var i = count; i < count + pageSize; i++){

	        addItem(content, "item " + i);

	    }

	    count += pageSize;

	},2000);

});
    
