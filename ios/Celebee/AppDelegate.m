//#import "AppDelegate.h"
//
//#import <React/RCTBundleURLProvider.h>
//#import <React/RCTRootView.h>
//#import <ReactNativeNavigation/ReactNativeNavigation.h>
//#import "RNSplashScreen.h"
//#import <FBSDKCoreKit/FBSDKCoreKit.h>
//
//@implementation AppDelegate
//
//- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
//{
//  NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
//  [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions];
//
//  [RNSplashScreen show];
//
//  return YES;
//}
//
//- (BOOL)application:(UIApplication *)application
//            openURL:(NSURL *)url
//            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
//
//  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
//                                                                openURL:url
//                                            sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
//                                       annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
//  ];
//  [[FBSDKApplicationDelegate sharedInstance] application:application
//                           didFinishLaunchingWithOptions:launchOptions];
//
//  BOOL handledGoogle = [RNGoogleSignin application:application
//                                          openURL:url sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
//                                        annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
//  // Add any custom logic here.
//  return handled || handledGoogle;
//
//}
//
//@end

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <RNGoogleSignin/RNGoogleSignin.h>
#import "RNSplashScreen.h"
#import <ReactNativeNavigation/ReactNativeNavigation.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  
  [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions];
  
  [RNSplashScreen show];
  
  return YES;
  
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  
  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
                                                                openURL:url
                                                      sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                                                             annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
                  ];
  BOOL handledGoogle = [RNGoogleSignin application:application
                                           openURL:url sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                                        annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
  // Add any custom logic here.
  return handled || handledGoogle;
}


@end
