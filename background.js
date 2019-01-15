// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var connect = function () {
	var socket = new SockJS('http://10.50.21.180:8080/gs-guide-websocket');
	var stompClient = Stomp.over(socket);
	stompClient.connect({}, function (frame) {

		console.log('Connected: ' + frame);

		stompClient.subscribe('/topic/greetings', function (greeting) {
			console.log("Got message: " + greeting);

			chrome.tabs.query({ url:"https://www.youtube.com/watch?v=G1IbRujko-A"},
				function (tabs) {
					chrome.tabs.sendMessage(tabs[0].id,
						{greeting: JSON.parse(greeting.body).content});
				});

		});

	});
};
var openGandalfTab = function () {
	var newURL = "https://www.youtube.com/watch?v=G1IbRujko-A";
	chrome.tabs.create({url: newURL});
};

chrome.runtime.onInstalled.addListener(function () {
	openGandalfTab();
	connect();
});
