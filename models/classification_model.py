from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.ensemble import AdaBoostClassifier
from xgboost import XGBClassifier

# Performance Matrix
from sklearn.metrics import accuracy_score, classification_report,confusion_matrix,\
                            precision_score, recall_score, f1_score, roc_auc_score,roc_curve 



models = {
    "Logistic Regression": LogisticRegression(),
    "SVM": SVC(),
    "KNN": KNeighborsClassifier(),
    "Decision Tree": DecisionTreeClassifier(),
    "Random Forest": RandomForestClassifier(),
    "Gradient Boosting": GradientBoostingClassifier(),
    "AdaBoost": AdaBoostClassifier(),
    "XGBoost": XGBClassifier()
}



def model_evalute(X_train,y_train,X_test,y_test,models):
    report = {}
    for model_name, model in models.items():
        model.fit(X_train,y_train)
        y_train_pred=model.predict(X_train)
        y_test_pred=model.predict(X_test)

        train_accuracy = accuracy_score(y_train, y_train_pred)
        test_accuracy = accuracy_score(y_test, y_test_pred)

        test_precision = precision_score(y_test, y_test_pred)
        test_recall = recall_score(y_test, y_test_pred)
        test_f1 = f1_score(y_test, y_test_pred)

        report[model_name] = {
                    "train_accuracy": train_accuracy,
                    "test_accuracy": test_accuracy,
                    "precision": test_precision,
                    "recall": test_recall,
                    "f1_score": test_f1
                }
    
    print(f"test acc of {max(report)} is",test_accuracy),
    print(f"train acc of {max(report)} is",train_accuracy)
    