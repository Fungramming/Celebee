package com.celebee;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.dooboolab.kakaologins.RNKakaoLoginsPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import java.util.Arrays;
import java.util.List;



// public class MainApplication extends Application implements ReactApplication {

//   private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

//   protected static CallbackManager getCallbackManager() {
//     return mCallbackManager;
//   }

//   private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
//     @Override
//     public boolean getUseDeveloperSupport() {
//       return BuildConfig.DEBUG;
//     }

//     @Override
//     protected List<ReactPackage> getPackages() {
//       return Arrays.<ReactPackage>asList(
//           new MainReactPackage(),
//             new RNKakaoLoginsPackage(),
//             new RNGoogleSigninPackage(),
//             new VectorIconsPackage(),
//             new SplashScreenReactPackage(),
//             new ImagePickerPackage(),
//             new FBSDKPackage(mCallbackManager)
//       );
//     }

//     @Override
//     protected String getJSMainModuleName() {
//       return "index";
//     }
//   };

//   @Override
//   public ReactNativeHost getReactNativeHost() {
//     return mReactNativeHost;
//   }

//   @Override
//   public void onCreate() {
//     super.onCreate();
//     SoLoader.init(this, /* native exopackage */ false);
//   }
// }

public class MainApplication extends NavigationApplication {
  
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

    
    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
            // eg. new VectorIconsPackage()
            new RNKakaoLoginsPackage(),
            new RNGoogleSigninPackage(),
            new VectorIconsPackage(),
            new SplashScreenReactPackage(),
            new ImagePickerPackage(),
            new FBSDKPackage(mCallbackManager),
            new ImageResizerPackage(),
            new FastImageViewPackage(),
            new ReactNativeRestartPackage()

        );
    }
  
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

}